import { create } from "zustand";
import { DeskThing } from "@deskthing/client";
import { DEVICE_CLIENT } from "@deskthing/types";
import { ClockSettingIDs, ClockSettings } from "@shared/settings";

/**
 * Shared store for stopwatch and countdown state.
 *
 * Manages its own DeskThing subscriptions — fetches the initial default
 * times from settings the same way settingsStore fetches time, and listens
 * for settings updates to keep defaults in sync. Nothing outside this store
 * needs to push settings into it.
 */

type TimerStore = {
  // --- Stopwatch ---
  stopwatchTime: number;
  stopwatchRunning: boolean;
  stopwatchDefaultTime: number;

  // --- Countdown ---
  countdownTime: number;
  countdownRunning: boolean;
  countdownDefaultTime: number;
  countdownFinished: boolean;

  // --- Lifecycle ---
  initialized: boolean;
  init: () => void;

  // --- Internal ---
  applyDefaults: (swDefault: number, cdDefault: number) => void;

  // --- Stopwatch controls ---
  stopwatchStart: () => void;
  stopwatchStop: () => void;
  stopwatchReset: () => void;
  stopwatchToggle: () => void;

  // --- Countdown controls ---
  countdownStart: () => void;
  countdownStop: () => void;
  countdownReset: () => void;
  countdownToggle: () => void;
};

let swInterval: ReturnType<typeof setInterval> | null = null;
let cdInterval: ReturnType<typeof setInterval> | null = null;

const clearSW = () => { if (swInterval) { clearInterval(swInterval); swInterval = null; } };
const clearCD = () => { if (cdInterval) { clearInterval(cdInterval); cdInterval = null; } };

const extractDefaults = (settings: ClockSettings) => ({
  swDefault: (settings[ClockSettingIDs.STOPWATCH_DEFAULT_TIME]?.value as number) ?? 0,
  cdDefault: (settings[ClockSettingIDs.COUNTDOWN_DEFAULT_TIME]?.value as number) ?? 60,
});

export const useTimerStore = create<TimerStore>((set, get) => ({
  stopwatchTime: 0,
  stopwatchRunning: false,
  stopwatchDefaultTime: 0,

  countdownTime: 60,
  countdownRunning: false,
  countdownDefaultTime: 60,
  countdownFinished: false,

  initialized: false,

  // ─── Init ────────────────────────────────────────────────────────────────────

  init: () => {
    if (get().initialized) return;
    set({ initialized: true });

    // Fetch real defaults as soon as settings are available
    DeskThing.getSettings().then((settings) => {
      if (!settings) return;
      const { swDefault, cdDefault } = extractDefaults(settings as ClockSettings);
      get().applyDefaults(swDefault, cdDefault);
    });

    // Keep defaults in sync when the user changes settings
    DeskThing.on(DEVICE_CLIENT.SETTINGS, (event) => {
      if (!event.payload) return;
      const { swDefault, cdDefault } = extractDefaults(event.payload as ClockSettings);
      get().applyDefaults(swDefault, cdDefault);
    });

    // Hardware button events forwarded from server actions
    DeskThing.on("stopwatch_toggle", () => get().stopwatchToggle());
    DeskThing.on("stopwatch_reset",  () => get().stopwatchReset());
    DeskThing.on("countdown_toggle", () => get().countdownToggle());
    DeskThing.on("countdown_reset",  () => get().countdownReset());
  },

  // ─── Internal ────────────────────────────────────────────────────────────────

  applyDefaults: (swDefault: number, cdDefault: number) => {
    const s = get();
    const updates: Partial<TimerStore> = {
      stopwatchDefaultTime: swDefault,
      countdownDefaultTime: cdDefault,
    };
    // Only move the displayed time if the timer is idle at the old default
    if (!s.stopwatchRunning && s.stopwatchTime === s.stopwatchDefaultTime)
      updates.stopwatchTime = swDefault;
    if (!s.countdownRunning && s.countdownTime === s.countdownDefaultTime)
      updates.countdownTime = cdDefault;
    set(updates);
  },

  // ─── Stopwatch ───────────────────────────────────────────────────────────────

  stopwatchStart: () => {
    if (get().stopwatchRunning) return;
    clearSW();
    set({ stopwatchRunning: true });
    swInterval = setInterval(() => {
      set((s) => ({ stopwatchTime: s.stopwatchTime + 1 }));
    }, 1000);
  },

  stopwatchStop: () => {
    clearSW();
    set({ stopwatchRunning: false });
  },

  stopwatchReset: () => {
    clearSW();
    set((s) => ({ stopwatchRunning: false, stopwatchTime: s.stopwatchDefaultTime }));
  },

  stopwatchToggle: () => {
    if(get().stopwatchRunning){
      get().stopwatchStop();
    }
    else {
      // If the stopwatch is at 0, reset it to the default time before starting
      if (get().stopwatchTime === 0) {
        get().stopwatchReset();
      }
      get().stopwatchStart();
    }
  },

  // ─── Countdown ───────────────────────────────────────────────────────────────

  countdownStart: () => {
    const s = get();
    if (s.countdownRunning || s.countdownTime <= 0) return;
    clearCD();
    set({ countdownRunning: true, countdownFinished: false });
    cdInterval = setInterval(() => {
      const remaining = get().countdownTime;
      if (remaining <= 1) {
        clearCD();
        set({ countdownTime: 0, countdownRunning: false, countdownFinished: true });
      } else {
        set({ countdownTime: remaining - 1 });
      }
    }, 1000);
  },

  countdownStop: () => {
    clearCD();
    set({ countdownRunning: false });
  },

  countdownReset: () => {
    clearCD();
    set((s) => ({
      countdownRunning: false,
      countdownTime: s.countdownDefaultTime,
      countdownFinished: false,
    }));
  },

  countdownToggle: () => {
    const s = get();
    if (s.countdownRunning) {
      get().countdownStop();
    } else if (s.countdownFinished || s.countdownTime <= 0) {
      get().countdownReset();
      setTimeout(() => get().countdownStart(), 50);
    } else {
      get().countdownStart();
    }
  },
}));
