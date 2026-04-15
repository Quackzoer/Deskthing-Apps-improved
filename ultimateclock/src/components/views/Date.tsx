import { ClockSettingIDs } from "@shared/index";
import { useDateStore } from "@src/store/dateStore";
import { useNavigationStore } from "@src/store/navigationStore";
import { useSettingStore } from "@src/store/settingsStore";
import { formatDate } from "@src/utils/format-date";


const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];


export const DateFull = () => {
  const dateFormat = useSettingStore(
    (s) => s.settings?.[ClockSettingIDs.DATE_FORMAT] ?? "MM/DD/YYYY"
  );
  const goBack = useNavigationStore((s) => s.goBack);
  const date = useDateStore(s=>s.currentDate)

  const dayName = date == null ? "Error" : DAYS[date.getDay()];
  const month = date == null ? "Error" : MONTHS[date.getMonth()]
  const day = date?.getDate() ?? "Error";
  const year = date?.getFullYear() ?? "Error";

  return (
    <div className="flex flex-col w-screen h-screen select-none white">

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
          {date && formatDate(dateFormat, date)}
        </p>
      </div>
    </div>
  );
};
