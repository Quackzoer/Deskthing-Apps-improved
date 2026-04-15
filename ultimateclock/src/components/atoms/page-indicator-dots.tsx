import { useNavigationStore, View } from "@src/store/navigationStore";

export const PageDots = ({ views, active }: { views: View[]; active: View }) => {
    const navigateTo = useNavigationStore(s => s.navigateTo)
    return (
        <div
            className="absolute left-0 right-0 z-20 flex justify-center w-full space-x-2 pointer-events-none bottom-4"
        >
            {views.map((v) => (
                <span
                    key={v}
                    className={`size-3 rounded-full bg-white ${v === active ? "opacity-90" : "opacity-25"} transition-all inline-block`}
                    onClick={() => navigateTo(v)}
                />
            ))}
        </div>
    )
};