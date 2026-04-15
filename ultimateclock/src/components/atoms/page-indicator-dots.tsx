import { useNavigationStore, View } from "@src/store/navigationStore";

export const PageDots = ({ views, active }: { views: View[]; active: View }) => {
    const navigateTo = useNavigationStore(s => s.navigateTo)
    return (
        <div className="z-20 flex flex-col items-center py-4">
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
                <span
                    className="text-3xl tracking-widest uppercase opacity-50"
                    style={{ letterSpacing: "0.25em" }}
                >
                    {active}
                </span>
            </div>
            <div
                className="flex justify-center w-full space-x-2 pointer-events-none "
            >
                {views.map((v) => (
                    <span
                        key={v}
                        className={`size-3 rounded-full bg-white ${v === active ? "opacity-90" : "opacity-25"} transition-all inline-block`}
                        onClick={() => navigateTo(v)}
                    />
                ))}
            </div>
        </div>
    )
};