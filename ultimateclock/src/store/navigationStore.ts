import { create } from "zustand";
import { DeskThing } from "@deskthing/client";

export type View = "clock" | "stopwatch" | "countdown" | "date";

type NavigationStore = {
  activeView: View;
  previousView: View;
  initialized: boolean;

  navigateTo: (view: View) => void;
  goBack: () => void;
  init: () => void;
};

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  activeView: "clock",
  previousView: "clock",
  initialized: false,

  navigateTo: (view: View) => {
    set((state) => ({
      previousView: state.activeView,
      activeView: view,
    }));
  },

  goBack: () => {
    set((state) => ({
      activeView: state.previousView,
      previousView: "clock",
    }));
  },

  init: () => {
    if (get().initialized) return;
    set({ initialized: true });

    // Hardware button navigation — forwarded from server actions
    DeskThing.on("navigate_stopwatch", () => get().navigateTo("stopwatch"));
    DeskThing.on("navigate_countdown", () => get().navigateTo("countdown"));
    DeskThing.on("navigate_clock", () => get().navigateTo("clock"));
    DeskThing.on("navigate_date", () => get().navigateTo("date"));
  },
}));
