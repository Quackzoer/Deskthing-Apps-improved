import { useTimerStore } from "@src/store/timerStore";
import { formatTime } from "@src/utils/format-time";
import { CtrlButton } from "../atoms/button";

export const StopwatchFull = () => {
  const time    = useTimerStore((s) => s.stopwatchTime);
  const running = useTimerStore((s) => s.stopwatchRunning);
  const toggle  = useTimerStore((s) => s.stopwatchToggle);
  const reset   = useTimerStore((s) => s.stopwatchReset);

  
  return (
    <div className="flex flex-col w-full h-full select-none" style={{ color: "white" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2 ">
        <span
          className="text-3xl tracking-widest uppercase opacity-50"
          style={{ letterSpacing: "0.25em" }}
        >
          Stopwatch
        </span>
        <span
          style={{
            color: running ? "#4ade80" : "transparent",
            transition: "color 0.2s",
          }}
        >
          ● RUN
        </span>
      </div>
      <div className="flex items-center justify-center flex-1 ">
        <span
          className="font-clock tabular-nums"
          style={{ fontSize: "120px", lineHeight: 1 }}
        >
          {formatTime(time)}
        </span>
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
