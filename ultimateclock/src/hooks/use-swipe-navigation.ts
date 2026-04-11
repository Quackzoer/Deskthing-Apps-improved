import { useRef } from "react";
import { View, useNavigationStore } from "@src/store/navigationStore";

// The ordered list of views — swipe left to go forward, right to go back
// date | clock | stopwatch | countdown
const VIEW_ORDER: View[] = ["date", "clock", "stopwatch", "countdown"];

const MIN_SWIPE_PX = 50;   // minimum horizontal distance to count as a swipe
const MAX_VERTICAL_PX = 80; // if the user drifts this far vertically, ignore it

export const useSwipeNavigation = () => {
  const navigateTo  = useNavigationStore((s) => s.navigateTo);
  const activeView  = useNavigationStore((s) => s.activeView);

  const touchStart  = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;

    // Ignore if swipe is more vertical than horizontal
    if (Math.abs(dy) > MAX_VERTICAL_PX) return;
    // Ignore short swipes
    if (Math.abs(dx) < MIN_SWIPE_PX) return;

    const currentIndex = VIEW_ORDER.indexOf(activeView);

    if (dx < 0) {
      // Swiped left → next view
      const next = VIEW_ORDER[currentIndex + 1];
      if (next) navigateTo(next);
    } else {
      // Swiped right → previous view
      const prev = VIEW_ORDER[currentIndex - 1];
      if (prev) navigateTo(prev);
    }
  };

  return { onTouchStart, onTouchEnd, viewOrder: VIEW_ORDER };
};
