import { useTimerStore } from "@src/store/timerStore";
import { formatTime } from "@src/utils/format-time";
import { CtrlButton } from "../atoms/button";
import { useState } from "react";

export const StopwatchFull = () => {
  const time    = useTimerStore((s) => s.stopwatchTime);
  const running = useTimerStore((s) => s.stopwatchRunning);
  const toggle  = useTimerStore((s) => s.stopwatchToggle);
  const reset   = useTimerStore((s) => s.stopwatchReset);

  const [laps,setLaps] = useState<Array<number>>([])
  const onClickLap = () => {
    setLaps(prev=>[...prev, time])
  }
  return (
    <div className="flex flex-col w-full h-full gap-4 text-white select-none" >
      <div className="flex items-center justify-center flex-1 ">
        <span
          className="font-clock"
          style={{ fontSize: "120px", lineHeight: 1 }}
        >
          {formatTime(time)}
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 text-5xl">
        {laps.slice(-5).map(lap=>(
          <div className="" key={lap}>
            {laps.indexOf(lap) + 1}. {formatTime(lap)}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center pb-10" style={{ gap: "32px" }}>
        <CtrlButton
          onClick={reset}
          color="rgba(148,163,184,0.2)"
          hoverColor="rgba(148,163,184,0.4)"
          label="Reset"
        />
        <CtrlButton
          onClick={onClickLap}
          color="rgba(148,163,184,0.2)"
          hoverColor="rgba(148,163,184,0.4)"
          label="Lap"
          disabled={!running}
        />
        <CtrlButton
          onClick={toggle}
          color={running ? "rgba(239,68,68,0.25)" : "rgba(34,197,94,0.25)"}
          hoverColor={running ? "rgba(239,68,68,0.5)" : "rgba(34,197,94,0.5)"}
          label={running ? "Stop" : "Start"}
          large
        />
      </div>
    </div>
  );
};
