import { ClockSettingIDs } from "@shared/index";
import { useSettingStore } from "@src/store/settingsStore";
import { formatDate } from "@src/utils/format-date";
import { StyledText } from "../molecules/styled-text";


const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];


export const DateFull = () => {
  const dateFormat = useSettingStore(
    (s) => s.settings?.[ClockSettingIDs.DATE_FORMAT] ?? "MM/DD/YYYY"
  );
  const date = useSettingStore(s => s.currentDate)

  const dayName = typeof date === 'object' ? DAYS[date.getUTCDay()] : date;
  const month = typeof date === 'object' ? MONTHS[date.getUTCMonth()] : date;
  const day = typeof date === 'object' ? date.getUTCDate() : date;
  const year = typeof date === 'object' ? date.getUTCFullYear() : date;
  return (
    <div className="flex flex-col items-center justify-center h-full select-none">
      <StyledText>
        <div className="flex flex-col items-center justify-center flex-1" style={{ gap: "8px" }}>
          <p
            className="text-4xl tracking-widest uppercase opacity-50"
          >
            {dayName}
          </p>
          <p className="font-clock text-7xl/tight">
            {day}
          </p>
          <p className="text-4xl">
            {month} {year}
          </p>
          <p className="text-2xl opacity-40">
            {typeof date === 'object' && formatDate(dateFormat, date)}
          </p>
        </div>
      </StyledText>
    </div>
  );
};
