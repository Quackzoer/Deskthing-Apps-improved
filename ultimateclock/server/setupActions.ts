import { DeskThing } from "@deskthing/server";
import { Action, DESKTHING_EVENTS } from "@deskthing/types";

/**
 * All action IDs registered with the DeskThing Server.
 * These appear in the DeskThing UI so users can bind them to
 * physical buttons / scroll wheel gestures on the CarThing.
 */
export enum ClockActionIDs {
  // Navigation
  NAVIGATE_STOPWATCH = "navigate_stopwatch",
  NAVIGATE_DATE = "navigate_date",
  NAVIGATE_COUNTDOWN = "navigate_countdown",
  NAVIGATE_CLOCK     = "navigate_clock",
  // Stopwatch
  STOPWATCH_TOGGLE   = "stopwatch_toggle",
  STOPWATCH_RESET    = "stopwatch_reset",
  // Countdown
  COUNTDOWN_TOGGLE   = "countdown_toggle",
  COUNTDOWN_RESET    = "countdown_reset",
}

export const setupActions = () => {
  const actions: Action[] = [
    {
      id: ClockActionIDs.NAVIGATE_STOPWATCH,
      name: "Open Stopwatch",
      description: "Switch to the stopwatch full-screen view",
      enabled: true,
      version: "0.11.3",
      version_code: 1,
    },
    {
      id: ClockActionIDs.NAVIGATE_COUNTDOWN,
      name: "Open Countdown",
      description: "Switch to the countdown full-screen view",
      enabled: true,
      version: "0.11.3",
      version_code: 1,
    },
    {
      id: ClockActionIDs.NAVIGATE_DATE,
      name: "Open Date",
      description: "Switch to the date full-screen view",
      enabled: true,
      version: "0.11.3",
      version_code: 1,
    },
    {
      id: ClockActionIDs.NAVIGATE_CLOCK,
      name: "Back to Clock",
      description: "Return to the main clock screen",
      enabled: true,
      version: "0.11.3",
      version_code: 1,
    },
    {
      id: ClockActionIDs.STOPWATCH_TOGGLE,
      name: "Stopwatch Start / Stop",
      description: "Toggle the stopwatch between running and paused",
      enabled: true,
      version: "0.11.3",
      version_code: 1,
    },
    {
      id: ClockActionIDs.STOPWATCH_RESET,
      name: "Stopwatch Reset",
      description: "Reset the stopwatch to its default start time",
      enabled: true,
      version: "0.11.3",
      version_code: 1,
    },
    {
      id: ClockActionIDs.COUNTDOWN_TOGGLE,
      name: "Countdown Start / Stop",
      description: "Toggle the countdown. If finished, resets and restarts.",
      enabled: true,
      version: "0.11.3",
      version_code: 1,
    },
    {
      id: ClockActionIDs.COUNTDOWN_RESET,
      name: "Countdown Reset",
      description: "Reset the countdown to its default time",
      enabled: true,
      version: "0.11.3",
      version_code: 1,
    },
  ];

  actions.forEach((a) => DeskThing.registerAction(a));
};

/**
 * Forward action events to the client.
 * The action ID is used directly as the message type so the client-side
 * stores can listen with DeskThing.on('<actionId>', handler).
 */
DeskThing.on(DESKTHING_EVENTS.ACTION, (data) => {
  const id = data.payload?.id as string | undefined;
  if (id && Object.values(ClockActionIDs).includes(id as ClockActionIDs)) {
    DeskThing.send({ type: id });
  }
});
