import { useNavigationStore } from "@src/store/navigationStore";
import { useTimerStore } from "@src/store/timerStore";
import { formatTime, urgencyColor } from "@src/utils/format-time";

export const CountdownWidget = () => {
  const time = useTimerStore((s) => s.countdownTime);
  const total = useTimerStore((s) => s.countdownDefaultTime);
  const running = useTimerStore((s) => s.countdownRunning);
  const finished = useTimerStore((s) => s.countdownFinished);
  const navigateTo = useNavigationStore((s) => s.navigateTo);

  const color = finished ? "#f87171" : urgencyColor(time, total);

  return (
    <div className="">
      <p className="text-xl text-neutral-300">Countdown</p>
      <button
        onClick={() => navigateTo("countdown")}
        className="flex items-center p-0 space-x-2 transition-opacity border-none cursor-pointer opacity-70 hover:opacity-100 bg-none"
        // style={{ gap: "8px" }}
        title="Open Countdown"
      >
        <span
          className={`size-4 rounded-full ${running ? "bg-green-400" : "bg-white bg-opacity-30"} transition-all flex-shrink-0 ${running ? "animate-pulse" : ""} inline-block`}
        />
        <span
          className="text-3xl font-clock tabular-nums whitespace-nowrap text-neutral-300"
          style={{
            color,
            transition: "color 0.5s",
          }}
        >
          {finished ? "00:00" : formatTime(time)}
        </span>
      </button>
    </div>
  );
};