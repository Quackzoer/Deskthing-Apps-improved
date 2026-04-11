import { useNavigationStore } from "@src/store/navigationStore";
import { useTimerStore } from "@src/store/timerStore";
import { formatTime } from "@src/utils/format-time";

export const StopwatchWidget = () => {
    const time = useTimerStore((s) => s.stopwatchTime);
    const running = useTimerStore((s) => s.stopwatchRunning);
    const navigateTo = useNavigationStore((s) => s.navigateTo);

    return (
        <div>
            <p className="text-3xl text-neutral-300">Stopwatch</p>
            <button
                onClick={() => navigateTo("stopwatch")}
                className="flex items-center p-0 space-x-2 transition-opacity border-none cursor-pointer opacity-70 hover:opacity-100 bg-none"
                style={{ gap: "8px" }}
                title="Open Stopwatch"
            >
                <span
                    className={`size-4 rounded-full ${running ? "bg-green-400" : "bg-white bg-opacity-30"} transition-all flex-shrink-0 ${running ? "animate-pulse" : ""} inline-block`}
                />
                <span className="text-3xl font-clock tabular-nums whitespace-nowrap text-neutral-300" >
                    {formatTime(time)}
                </span>
            </button>
        </div>
    );
};