import { createDeskThing } from "@deskthing/client";
import { GenericTransitData } from "@deskthing/types";
import { create } from "zustand";

interface DatePayload {
  type: "current_date";
  payload?: Date;
}

const DeskThing = createDeskThing<DatePayload, GenericTransitData>();

type DateStore = {
  currentDate: Date | null;
  initialized: boolean;
  init: () => void;
};

export const useDateStore = create<DateStore>((set, get) => ({
  currentDate: null,
  initialized: false,

  init: () => {
    if (get().initialized) return;

    DeskThing.on("current_date", (data) => {
      if (!data.payload) return;
      set({ currentDate: new Date(data.payload as unknown as string) });
    });

    set({ initialized: true });

    // Request the current date from the server now that the listener is ready
    DeskThing.send({ type: "get" });
  },
}));
