import { createDeskThing } from "@deskthing/client";
import { GenericTransitData } from "@deskthing/types";

interface DatePayload {
  type: "current_date";
  payload?: Date;
}

export const DeskThing = createDeskThing<DatePayload, GenericTransitData>();