import { DESKTHING_EVENTS } from "@deskthing/types";
import { DeskThing } from "@deskthing/server";

export class CurrentDateService {
  private static instance: CurrentDateService | null = null;
  private midnightTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    DeskThing.on(DESKTHING_EVENTS.DATA, (data) => {
      if (data?.type === "get") {
        this.sendDate();
      }
    });
    this.scheduleMidnightUpdate();
  }

  static getInstance(): CurrentDateService {
    CurrentDateService.instance ??= new CurrentDateService();
    return CurrentDateService.instance;
  }

  private sendDate() {
    DeskThing.send({ type: "current_date", payload: new Date() });
  }

  private scheduleMidnightUpdate() {
    if (this.midnightTimer) clearTimeout(this.midnightTimer);

    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    this.midnightTimer = setTimeout(() => {
      this.sendDate();
      this.scheduleMidnightUpdate();
    }, msUntilMidnight);
  }

  stop() {
    if (this.midnightTimer) {
      clearTimeout(this.midnightTimer);
      this.midnightTimer = null;
    }
  }
}
