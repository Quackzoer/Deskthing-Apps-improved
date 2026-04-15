import { ClockSettingIDs, ClockWidgets } from "@shared/index";
import { useMusicStore } from "@src/store/musicStore";
import { useSettingStore } from "@src/store/settingsStore";
import { CountdownWidget } from "../atoms/countdown-widget";
import { DateWidget } from "../atoms/date-widget";
import { StopwatchWidget } from "../atoms/stopwatch-widget";
import { ClockWrapper } from "../molecules/ClockWrapper";
import { ClockWidget } from "../atoms/clock-widget";


// Maps ordering IDs to their compact widget component
const WIDGET_MAP: Record<string, React.FC> = {
  [ClockWidgets.CLOCK]: ClockWidget,
  [ClockWidgets.DATE]: DateWidget,
  [ClockWidgets.STOPWATCH]: StopwatchWidget,
  [ClockWidgets.COUNTDOWN]: CountdownWidget,
};

export const Main = () => {
  const time = useSettingStore((s) => s.currentTime);
  const settings = useSettingStore((s) => s.settings);
  const color = useMusicStore((s) => s.textColor) || "#ffffff";

  // ── Widget / ordering settings ──────────────────────────────────────────────
  const enabledWidgets: string[] = settings?.[ClockSettingIDs.WIDGETS] ?? [ClockWidgets.DATE];
  const ordering: string[] = settings?.[ClockSettingIDs.CLOCK_ORDERING] ?? [
    "clock",
    ClockWidgets.DATE,
    ClockWidgets.STOPWATCH,
    ClockWidgets.COUNTDOWN,
  ];

  // ── Style settings ──────────────────────────────────────────────────────────
  const transparency = settings?.[ClockSettingIDs.CLOCK_OPACITY] ?? 1;
  const shadowEnabled = settings?.[ClockSettingIDs.CLOCK_SHADOW] ?? false;
  const shadowDistance = settings?.[ClockSettingIDs.CLOCK_SHADOW_DISTANCE] ?? 0;
  const shadowOpacity = settings?.[ClockSettingIDs.CLOCK_SHADOW_OPACITY] ?? 0;
  const shadowBlur = settings?.[ClockSettingIDs.CLOCK_SHADOW_BLUR] ?? 0;
  const justify = settings?.[ClockSettingIDs.CLOCK_JUSTIFY_CONTENT] || "center";
  const gradientEnabled = settings?.[ClockSettingIDs.COLOR_OPTIONS] === "gradient";
  const gradientStart = settings?.[ClockSettingIDs.GRADIENT_START] || "#ff0000";
  const gradientEnd = settings?.[ClockSettingIDs.GRADIENT_END] || "#0000ff";
  const fontSize = settings?.[ClockSettingIDs.CLOCK_SIZE] || 180;
  const x = settings?.[ClockSettingIDs.CLOCK_POS_X] ?? 0;
  const y = settings?.[ClockSettingIDs.CLOCK_POS_Y] ?? 0;

  const baseStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    opacity: transparency,
    transform: `translate(${x}px, ${y}px)`,
    justifyContent: justify,
  };

  const shadowStyle: React.CSSProperties = {
    ...baseStyle,
    color: shadowEnabled ? `rgba(0,0,0,${shadowOpacity})` : "transparent",
    transform: `translate(${x + shadowDistance}px, ${y + shadowDistance}px)`,
    filter: shadowEnabled ? `blur(${shadowBlur}px)` : "none",
    position: "absolute",
    zIndex: 1,
  };

  const textStyle: React.CSSProperties = gradientEnabled
    ? {
      ...baseStyle,
      background: `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      position: "relative",
      zIndex: 2,
    }
    : {
      ...baseStyle,
      color,
      textShadow: shadowEnabled
        ? `${shadowDistance}px ${shadowDistance}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`
        : "none",
    };

  // ── Render ──────────────────────────────────────────────────────────────────

  const renderItem = (id: string) => {
    if (id === "clock") {
      return (
        <div key="clock" style={{ position: "relative", display: "inline-block" }}>
          {gradientEnabled && shadowEnabled && (
            <p className="min-h-fit min-w-fit whitespace-nowrap font-clock" style={shadowStyle}>
              {time}
            </p>
          )}
          <p className="min-h-fit min-w-fit whitespace-nowrap font-clock" style={textStyle}>
            {time}
          </p>
        </div>
      );
    }

    if (!enabledWidgets.includes(id)) return null;
    const Widget = WIDGET_MAP[id];
    if (!Widget) return null;
    return <Widget key={id} />;
  };

  // Filter down to only items that will actually produce output
  const renderableIds = ordering.filter((id) =>
    id === "clock" || (enabledWidgets.includes(id) && !!WIDGET_MAP[id])
  );

  // All items except the last two stack vertically.
  // The last two always sit side by side in a row.
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