import React from "react";
import { BackgroundComponent } from "./components/Background";
import { Clock } from "./components/views/Clock";
import { CountdownFull } from "./components/views/Countdown";
import { DateFull } from "./components/views/Date";
import { StopwatchFull } from "./components/views/Stopwatch";
import { useSwipeNavigation } from "./hooks/use-swipe-navigation";
import { useNavigationStore } from "./store/navigationStore";
import { StoreInitializer } from "./store/storeInitializer";
import { PageDots } from "./components/atoms/page-indicator-dots";


// ─── App ──────────────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const activeView = useNavigationStore((s) => s.activeView);
  const { onTouchStart, onTouchEnd, viewOrder } = useSwipeNavigation();

  const renderView = () => {
    switch (activeView) {
      case "date": return <DateFull />;
      case "stopwatch": return <StopwatchFull />;
      case "countdown": return <CountdownFull />;
      case "clock":
      default: return <Clock />;
    }
  };

  return (
    <div
      className="relative z-10 flex items-center justify-center w-screen h-screen overflow-hidden bg-slate-900"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <StoreInitializer />
      <BackgroundComponent />

      {/* <div className="relative z-10 flex items-center justify-center w-full h-full">
        {renderView()}
      </div> */}
      <div className="z-10 w-full h-full">
        {renderView()}
      </div>
      <PageDots views={viewOrder} active={activeView} />
    </div>
  );
};

export default App;