import { ClockSettingIDs } from "@shared/settings";
import { useNavigationStore } from "@src/store/navigationStore";
import { useSettingStore } from "@src/store/settingsStore";
import { formatDate } from "@src/utils/format-date";

export const DateWidget = () => {
    const dateFormat = useSettingStore(
        (s) => s.settings?.[ClockSettingIDs.DATE_FORMAT] ?? "MM/DD/YYYY"
    );
    const navigateTo = useNavigationStore((s) => s.navigateTo);
    const date = useSettingStore(s=>s.currentDate)

    return (
        <button
            onClick={() => navigateTo("date")}
            className="flex items-center p-0 transition-opacity border-none cursor-pointer opacity-60 hover:opacity-100"
            style={{ background: "none", gap: "8px" }}
            title="Open Date"
        >
            <span className="text-5xl font-clock whitespace-nowrap text-neutral-300">
                {typeof date === 'object' ? formatDate(dateFormat, date) : date}
            </span>
        </button>
    );
};