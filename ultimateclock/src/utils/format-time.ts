
export const pad = (n: number) => String(n).padStart(2, "0");

export const formatTime = (totalSeconds: number): string => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

export const urgencyColor = (remaining: number, total: number): string => {
  if (total === 0) return "white";
  const ratio = remaining / total;
  if (ratio > 0.3) return "white";
  if (ratio > 0.1) return "#fb923c"; // orange
  return "#f87171";                   // red
};
