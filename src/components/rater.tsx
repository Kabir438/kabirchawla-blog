"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";
import { useEffect, useState } from "react";

export default function Rater({
    slug
}: {
    slug: string;
}) {
    const [isActive, setIsActive] = useState(false);
    const [pressedStatus, setPressedStatus] = useState<null | number>(null)
    const [hoverStatus, setHoverStatus] = useState<null | number>(null);
    const onHover = (buttonNumber: number, sectionNumber: 1 | 2) => () => {
        if (sectionNumber === 1) {
            setHoverStatus(buttonNumber - 0.5)
        } else {
            setHoverStatus(buttonNumber)
        }
    }
    const onClick = () => {
        if (hoverStatus) {
            setPressedStatus(hoverStatus)
            localStorage.setItem(`rating-${slug}`, `${hoverStatus}`)
        }
    }
    useEffect(() => {
        const dbItem = Number(localStorage.getItem(`rating-${slug}`))
        setPressedStatus(dbItem)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="flex justify-center w-min space-x-2 relative [user-select:none]" onMouseLeave={() => setHoverStatus(null)}>
            {[1, 2, 3, 4, 5].map((rating) => (
                <Button onMouseDown={onClick} onMouseUp={onClick} key={`rating-${rating}`} variant="ghost" className={cn("rounded-full icon-glow group/button relative hover:bg-transparent overflow-hidden h-10 w-10 sm:h-16 sm:w-16", (hoverStatus && isActive && (hoverStatus === (rating - 0.5) || hoverStatus === rating)) ? "active" : "")} size="icon">
                    {/* full present */}
                    <Star
                        className={cn("sm:w-[calc(100%_-_28px)] sm:h-[calc(100%_-_28px)] w-[calc(100%_-_12px)] h-[calc(100%_-_12px)] transition-all duration-200 text-amber-500 z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            ((hoverStatus !== null && !isActive) && hoverStatus >= (rating)) ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {/* none present */}
                    <Star
                        className={cn("sm:w-[calc(100%_-_28px)] sm:h-[calc(100%_-_28px)] w-[calc(100%_-_12px)] h-[calc(100%_-_12px)] transition-all duration-200 text-gray-500 z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            ((hoverStatus !== null && !isActive) && hoverStatus <= (rating - 0.5)) ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {/* half present */}
                    <StarHalf
                        className={cn("sm:w-[calc(100%_-_28px)] sm:h-[calc(100%_-_28px)] w-[calc(100%_-_12px)] h-[calc(100%_-_12px)] transition-all duration-200 text-amber-500 z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            ((hoverStatus !== null && !isActive) && hoverStatus === (rating - 0.5)) ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {/* not hovered && nothing selected */}
                    <Star
                        className={cn("sm:w-[calc(100%_-_28px)] sm:h-[calc(100%_-_28px)] w-[calc(100%_-_12px)] h-[calc(100%_-_12px)] transition-all duration-200 text-white z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            ((hoverStatus === null) && pressedStatus === null) ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {/* not hovered && full selected */}
                    <Star
                        className={cn("sm:w-[calc(100%_-_28px)] sm:h-[calc(100%_-_28px)] w-[calc(100%_-_12px)] h-[calc(100%_-_12px)] transition-all duration-200 lucide-filled-star text-amber-400 z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            ((hoverStatus === null || isActive) && (isActive ? (typeof hoverStatus === "number" ? hoverStatus : pressedStatus) : pressedStatus) !== null && (isActive ? (typeof hoverStatus === "number" ? hoverStatus : pressedStatus)! : pressedStatus!) >= (rating)) ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {/* not hovered && not selected */}
                    <Star
                        className={cn("sm:w-[calc(100%_-_28px)] sm:h-[calc(100%_-_28px)] w-[calc(100%_-_12px)] h-[calc(100%_-_12px)] transition-all duration-200 lucide-filled-star text-gray-500 z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            ((hoverStatus === null || isActive) && (isActive ? (typeof hoverStatus === "number" ? hoverStatus : pressedStatus) : pressedStatus) !== null && (isActive ? (typeof hoverStatus === "number" ? hoverStatus : pressedStatus)! : pressedStatus!) <= (rating - 0.5)) ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {/* not hovered && half selected */}
                    <Star
                        className={cn("sm:w-[calc(100%_-_28px)] sm:h-[calc(100%_-_28px)] w-[calc(100%_-_12px)] h-[calc(100%_-_12px)] transition-all duration-200 lucide-half-filled-star text-amber-400 z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            ((hoverStatus === null || isActive) && (isActive ? (typeof hoverStatus === "number" ? hoverStatus : pressedStatus) : pressedStatus) !== null && (isActive ? (typeof hoverStatus === "number" ? hoverStatus : pressedStatus) : pressedStatus) === (rating - 0.5)) ? "opacity-100" : "opacity-0"
                        )}
                    />
                    <div onMouseEnter={onHover(rating, 1)} onMouseDown={() => { setIsActive(true) }} onMouseUp={() => setIsActive(false)} className="h-full w-1/2 bg-gray-500 bg-opacity-0 hover:bg-opacity-20 group-[.active]/button:bg-opacity-20 group-[.active]/button:bg-amber-400 duration-200 transition-all relative z-10"></div>
                    <div onMouseEnter={onHover(rating, 2)} onMouseDown={() => { setIsActive(true) }} onMouseUp={() => setIsActive(false)} className="h-full w-1/2 bg-gray-500 bg-opacity-0 hover:bg-opacity-20 group-[.active]/button:bg-opacity-20 group-[.active]/button:bg-amber-400 duration-200 transition-all relative z-10"></div>
                </Button>
            ))}
        </div>
    )
}