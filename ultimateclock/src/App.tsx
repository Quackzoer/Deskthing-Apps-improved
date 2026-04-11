import React from "react";
import { Clock } from "./components/views/Clock";
import { StoreInitializer } from "./store/storeInitializer";
import { BackgroundComponent } from "./components/Background";
import { StopwatchFull } from "./components/views/Stopwatch";
import { CountdownFull } from "./components/views/Countdown";
import { DateFull } from "./components/views/Date";
import { useNavigationStore, View } from "./store/navigationStore";
import { useSwipeNavigation } from "./hooks/use-swipe-navigation";

// ─── Page indicator dots ──────────────────────────────────────────────────────

const PageDots = ({ views, active }: { views: View[]; active: View }) => (
  <div
    className="absolute left-0 right-0 z-20 flex justify-center pointer-events-none bottom-4"
    style={{ gap: "16px" }}
  >
    {views.map((v) => (
      <span
        key={v}
        className={`size-3 rounded-full bg-white ${v === active ? "opacity-90" : "opacity-25"} transition-all inline-block`}
      />
    ))}
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const activeView = useNavigationStore((s) => s.activeView);
  const { onTouchStart, onTouchEnd, viewOrder } = useSwipeNavigation();

  const renderView = () => {
    switch (activeView) {
      case "date":      return <DateFull />;
      case "stopwatch": return <StopwatchFull />;
      case "countdown": return <CountdownFull />;
      case "clock":
      default:          return <Clock />;
    }
  };

  return (
    <div
      className="relative flex items-center justify-center w-screen h-screen overflow-hidden bg-slate-900"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <StoreInitializer />
      <BackgroundComponent />

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {renderView()}
      </div>

      <PageDots views={viewOrder} active={activeView} />
    </div>
  );
};

export default App;