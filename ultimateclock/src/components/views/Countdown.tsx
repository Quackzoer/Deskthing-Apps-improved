import { useNavigationStore } from "@src/store/navigationStore";
import { useTimerStore } from "@src/store/timerStore";
import { formatTime, urgencyColor } from "@src/utils/format-time";
import { useState } from "react";
import { CtrlButton } from "../atoms/button";


export const CountdownFull = () => {
  const time = useTimerStore((s) => s.countdownTime);
  const total = useTimerStore((s) => s.countdownDefaultTime);
  const running = useTimerStore((s) => s.countdownRunning);
  const finished = useTimerStore((s) => s.countdownFinished);
  const toggle = useTimerStore((s) => s.countdownToggle);
  const reset = useTimerStore((s) => s.countdownReset);

  const timeColor = finished ? "#f87171" : urgencyColor(time, total);

  const [isSettingTime, setIsSettingTime] = useState(false);

  const handleTimeClick = () => {
    if (running) return;
    setIsSettingTime(true);
  };

  const handleTimeChange = (newTime: number) => {
    useTimerStore.setState({ countdownDefaultTime: newTime, countdownTime: newTime });
    setIsSettingTime(false);
  };

  const progress = total > 0 ? time / total : 0;

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
        {isSettingTime ? (
          <span
            className="font-clock tabular-nums"
            style={{
              fontSize: "120px",
              lineHeight: 1,
              color: timeColor,
              transition: "color 0.5s",
              animation: finished ? "pulse 1s ease-in-out infinite" : "none",
            }}
            onClick={handleTimeClick}
          >
            {finished ? "00:00" : formatTime(time)}
          </span>
        ) : (
          <div>
            <p>Setting time</p>
            {/* <p>Seconds</p>
            <FlatWheelPicker options={new Array(60).fill(0).map((_, i) => i)} onChange={handleTimeChange} />
            <p>Minutes</p>
            <FlatWheelPicker options={new Array(60).fill(0).map((_, i) => i)} onChange={handleTimeChange} />
            <p>Hours</p>
            <FlatWheelPicker options={new Array(24).fill(0).map((_, i) => i)} onChange={handleTimeChange} /> */}
          </div>
        )}

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
          onClick={()=>{
            setIsSettingTime(false);
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