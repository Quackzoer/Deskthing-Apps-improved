import { DeskThing } from "@deskthing/client";
import { ClockSettingIDs } from "@shared/index";
import { useSettingStore } from "@src/store/settingsStore";
import { formatDate } from "@src/utils/format-date";


const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];


export const DateFull = () => {
  const dateFormat = useSettingStore(
    (s) => s.settings?.[ClockSettingIDs.DATE_FORMAT] ?? "MM/DD/YYYY"
  );
  const date = useSettingStore(s=>s.currentDate)
  
  const dayName = typeof date === 'object' ? DAYS[date.getUTCDay()] : date;
  const month   = typeof date === 'object' ? MONTHS[date.getUTCMonth()] : date;
  const day     = typeof date === 'object' ? date.getUTCDate() : date;
  const year    = typeof date === 'object' ? date.getUTCFullYear() : date;
  return (
    <div className="flex flex-col select-none white">

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <span
          className="tracking-widest uppercase opacity-50"
          style={{ fontSize: "16px", letterSpacing: "0.25em" }}
        >
          Date
        </span>
        {/* Spacer to balance header */}
        <span style={{ minWidth: "80px" }} />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1" style={{ gap: "8px" }}>
        <p
          className="tracking-widest uppercase opacity-50"
          style={{ fontSize: "18px", letterSpacing: "0.3em" }}
        >
          {dayName}
        </p>
        <p className="font-clock" style={{ fontSize: "120px", lineHeight: 1 }}>
          {day}
        </p>
        <p style={{ fontSize: "28px", opacity: 0.8 }}>
          {month} {year}
        </p>
        <p style={{ fontSize: "18px", opacity: 0.4, marginTop: "8px" }}>
          {typeof date === 'object' && formatDate(dateFormat, date)}
        </p>
      </div>
    </div>
  );
};
