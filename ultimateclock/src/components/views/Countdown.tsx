import { DeskThing } from "@src/lib/desk-thing-client";
import { useTimerStore } from "@src/store/timerStore";
import { formatTime, urgencyColor } from "@src/utils/format-time";
import { useCallback, useEffect } from "react";
import { CtrlButton } from "../atoms/button";

const TIME_DIFFERENCE_IN_SECONDS = 30

export const CountdownFull = () => {
  const time = useTimerStore((s) => s.countdownTime);
  const total = useTimerStore((s) => s.countdownDefaultTime);
  const running = useTimerStore((s) => s.countdownRunning);
  const finished = useTimerStore((s) => s.countdownFinished);
  const toggle = useTimerStore((s) => s.countdownToggle);
  const reset = useTimerStore((s) => s.countdownReset);

  const timeColor = finished ? "#f87171" : urgencyColor(time, total);


  const handleWheelUp = useCallback(() => {
    const newTime = time + TIME_DIFFERENCE_IN_SECONDS
    useTimerStore.setState({ countdownTime: newTime, countdownDefaultTime: newTime, })
  }, [time])
  const handleWheelDown = useCallback(() => {
    const newTime = time - TIME_DIFFERENCE_IN_SECONDS
    if(newTime < 0){
      useTimerStore.setState({ countdownTime: 0, countdownDefaultTime: 0, })
    }else{
      useTimerStore.setState({ countdownTime: newTime, countdownDefaultTime: newTime, })
    }
  }, [time])

  useEffect(() => {
    DeskThing.overrideKeys(['wheel'])
    const handleWheel = (e: WheelEvent) => {

      e.preventDefault()
      e.stopPropagation()
      if (e.deltaY !== 0) {
        e.deltaY < 0 ? handleWheelUp() : handleWheelDown();
      } else if (e.deltaX !== 0) {
        e.deltaX < 0 ? handleWheelUp() : handleWheelDown();
      }
    }
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true })
      DeskThing.restoreKeys(['wheel'])
    }
  }, [handleWheelUp, handleWheelDown])
  return (
    <div className="flex flex-col w-full h-full select-none" style={{ color: "white" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <span style={{ minWidth: "60px", textAlign: "right" }} className="text-xl">
          {running && <span style={{ color: "#fb923c" }}>● RUN</span>}
          {finished && <span style={{ color: "#f87171", animation: "pulse 1s ease-in-out infinite" }}>✓ DONE</span>}
        </span>
      </div>

      {/* Time display */}
      <div className="flex items-center justify-center flex-1">
        <span
          className="font-clock tabular-nums"
          style={{
            fontSize: "120px",
            lineHeight: 1,
            color: timeColor,
            transition: "color 0.5s",
            animation: finished ? "pulse 1s ease-in-out infinite" : "none",
          }}
        >
          {formatTime(time)}
        </span>

      </div>

      {/* Controls */}
      <div className="flex justify-center pb-6" style={{ gap: "32px" }}>
        <CtrlButton
          onClick={reset}
          color="rgba(148,163,184,0.2)"
          hoverColor="rgba(148,163,184,0.4)"
          label="Reset"
        />
        <CtrlButton
          onClick={() => {
            toggle()
          }}
          color={
            running
              ? "rgba(239,68,68,0.25)"
              : finished
                ? "rgba(59,130,246,0.25)"
                : "rgba(34,197,94,0.25)"
          }
          hoverColor={
            running
              ? "rgba(239,68,68,0.5)"
              : finished
                ? "rgba(59,130,246,0.5)"
                : "rgba(34,197,94,0.5)"
          }
          label={running ? "Stop" : finished ? "Restart" : "Start"}
          large
        />
      </div>
    </div>
  );
};