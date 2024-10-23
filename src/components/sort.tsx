"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowDownAZ, ArrowDownWideNarrow, ArrowDownZA, ClockArrowUp, Rocket, Speech, Star } from "lucide-react";
import React, { type Dispatch, type SetStateAction } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function Sort({
    sortingTechnique,
    setSortingTechnique
}: {
    sortingTechnique: "relevant" | "latest" | "popular" | "ascending" | "descending" | "rating";
    setSortingTechnique: Dispatch<SetStateAction<"relevant" | "latest" | "popular" | "ascending" | "descending" | "rating">>;
}) {
    return (
        <Select value={sortingTechnique} onValueChange={newValue => setSortingTechnique(newValue as typeof sortingTechnique)}>
            <SelectTrigger className="w-[180px] border-0 bg-zinc-800 !ring-0 !ring-offset-0 group/select-button">
                <SelectValue placeholder={<span className="inline-flex relative top-[2px] items-center gap-1">
                    <ArrowDownWideNarrow className="group-data-[state='closed']/select-button:block group-data-[state='open']/select-button:block hidden" />
                    Sort
                </span>} className="!ring-0 !ring-offset-0" />
            </SelectTrigger>
            <SelectContent className="ring-0 ring-offset-0 bg-zinc-900 border-0">
                {/* Default for Search */}
                <SelectItem className="bg-zinc-900 cursor-pointer focus:bg-zinc-800 group-data-[state='closed']/select-button:block group-data-[state='open']/select-button:block hidden" value="relevant">
                    <div className="flex flex-nowrap gap-1">
                        <ArrowDownWideNarrow className="group-data-[state='closed']/select-button:block group-data-[state='open']/select-button:block hidden" />
                        <Rocket className="group-data-[state='closed']/select-button:hidden group-data-[state='open']/select-button:hidden" />Most Relevant
                    </div>
                </SelectItem>
                {/* Normal */}
                <SelectItem className="bg-zinc-900 cursor-pointer focus:bg-zinc-800" value="latest">
                    <div className="flex flex-nowrap gap-1">
                        <ArrowDownWideNarrow className="group-data-[state='closed']/select-button:block group-data-[state='open']/select-button:block hidden" />
                        <ClockArrowUp className="group-data-[state='closed']/select-button:hidden group-data-[state='open']/select-button:hidden" />Latest
                    </div>
                </SelectItem>
                <SelectItem className="bg-zinc-900 cursor-pointer focus:bg-zinc-800" value="popular">
                    <div className="flex flex-nowrap gap-1">
                        <ArrowDownWideNarrow className="group-data-[state='closed']/select-button:block group-data-[state='open']/select-button:block hidden" />
                        <Speech className="group-data-[state='closed']/select-button:hidden group-data-[state='open']/select-button:hidden" />Popularity
                    </div>
                </SelectItem>
                <SelectItem className="bg-zinc-900 cursor-pointer focus:bg-zinc-800 mt-1" value="rating">
                    <div className="flex flex-nowrap gap-1">
                        <ArrowDownWideNarrow className="group-data-[state='closed']/select-button:block group-data-[state='open']/select-button:block hidden" />
                        <Star className="group-data-[state='closed']/select-button:hidden group-data-[state='open']/select-button:hidden" />Ratings
                    </div>
                </SelectItem>
                <SelectItem className="bg-zinc-900 cursor-pointer focus:bg-zinc-800 mt-1" value="ascending">
                    <div className="flex flex-nowrap gap-1">
                        <ArrowDownWideNarrow className="group-data-[state='closed']/select-button:block group-data-[state='open']/select-button:block hidden" />
                        <ArrowDownAZ className="group-data-[state='closed']/select-button:hidden group-data-[state='open']/select-button:hidden" />Ascending
                    </div>
                </SelectItem>
                <SelectItem className="bg-zinc-900 cursor-pointer focus:bg-zinc-800 mt-1" value="descending">
                    <div className="flex flex-nowrap gap-1">
                        <ArrowDownWideNarrow className="group-data-[state='closed']/select-button:block group-data-[state='open']/select-button:block hidden" />
                        <ArrowDownZA className="group-data-[state='closed']/select-button:hidden group-data-[state='open']/select-button:hidden" />Descending
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    )
}

const StyledSort = React.forwardRef<HTMLDivElement, {
    className?: string,
} & React.ComponentProps<typeof Sort>>(
    ({ className, ...props }, ref) => {
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);
        const radius = useMotionValue(0);
        const [focused, setFocused] = React.useState(false);
        const [visible, setVisible] = React.useState(false);

        function handleMouseMove({ currentTarget, clientX, clientY }: {
            currentTarget: HTMLElement,
            clientX: number,
            clientY: number,
        }) {
            const { left, top } = currentTarget.getBoundingClientRect();

            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        const bg = useMotionTemplate`
      radial-gradient(
        ${radius}px circle at ${mouseX}px ${mouseY}px,
        #ffd9ae,
        transparent 80%
      )
    `;


        return (
            <motion.div
                style={{
                    background: bg,
                }}
                transition={{
                    duration: 2000
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => {
                    if (focused) {
                        radius.set(100)
                    } else {
                        radius.set(100)
                    }
                    setVisible(true);
                }}
                onMouseLeave={() => {
                    if (focused) {
                        radius.set(1000)
                    } else {
                        radius.set(0)
                    }
                    setVisible(false);
                }}
                ref={ref}
                onFocus={() => {
                    if (visible) {
                        radius.set(100)
                    } else {
                        radius.set(1000)
                    }
                    setFocused(true);
                }}
                onBlur={() => {
                    if (visible) {
                        radius.set(100)
                    } else {
                        radius.set(0)
                    }
                    setFocused(false);
                }}
                className={cn("p-[2px] rounded-lg transition duration-300 group/input", className)}
            >
                <Sort {...props} />
            </motion.div>
        );
    }
);
StyledSort.displayName = "Styled Sort";

export default StyledSort;