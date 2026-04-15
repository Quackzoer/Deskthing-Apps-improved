import { ClockSettingIDs, ClockWidgets } from "@shared/index";
import { useSettingStore } from "@src/store/settingsStore";
import { ClockWidget } from "../atoms/clock-widget";
import { CountdownWidget } from "../atoms/countdown-widget";
import { DateWidget } from "../atoms/date-widget";
import { StopwatchWidget } from "../atoms/stopwatch-widget";
import { ClockWrapper } from "../molecules/ClockWrapper";


// Maps ordering IDs to their compact widget component
const WIDGET_MAP: Record<string, React.FC> = {
  [ClockWidgets.CLOCK]: ClockWidget,
  [ClockWidgets.DATE]: DateWidget,
  [ClockWidgets.STOPWATCH]: StopwatchWidget,
  [ClockWidgets.COUNTDOWN]: CountdownWidget,
};

export const Main = () => {
  const settings = useSettingStore((s) => s.settings);

  // ── Widget / ordering settings ──────────────────────────────────────────────
  const enabledWidgets: string[] = settings?.[ClockSettingIDs.WIDGETS] ?? [ClockWidgets.DATE];
  const ordering: string[] = settings?.[ClockSettingIDs.CLOCK_ORDERING] ?? [
    "clock",
    ClockWidgets.DATE,
    ClockWidgets.STOPWATCH,
    ClockWidgets.COUNTDOWN,
  ];

  // ── Render ──────────────────────────────────────────────────────────────────

  const renderItem = (id: string) => {
    if (!enabledWidgets.includes(id)) return null;
    const Widget = WIDGET_MAP[id];
    if (!Widget) return null;
    return <Widget key={id} />;
  };

  // Filter down to only items that will actually produce output
  const renderableIds = ordering.filter((id) =>
    id === "clock" || (enabledWidgets.includes(id) && !!WIDGET_MAP[id])
  );
  const soloIds = renderableIds.slice(0, -2);
  const pairIds = renderableIds.slice(-2);

  return (
    <ClockWrapper>
      <div
        className="relative flex flex-col items-center w-full gap-1"
      >
        {soloIds.map(renderItem)}
        <div className="flex flex-row items-center justify-center space-x-4 text-lg text-slate-300">
          {pairIds.map(renderItem)}
        </div>
      </div>
    </ClockWrapper>
  );
};