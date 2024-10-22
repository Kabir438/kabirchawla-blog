"use client";

import { Filter } from "lucide-react";
import * as React from "react";

import { Command as CommandPrimitive } from "cmdk";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Badge } from "./badge";
import { Checkbox } from "./checkbox"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "./command";

export type Option = Record<"value" | "label", string>;

function FancyMultiSelect({
    options,
    chosenOptions,
    updateChosenOptions
}: {
    options: Option[];
    chosenOptions: Option[];
    updateChosenOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [width, setWidth] = React.useState<number | undefined>(undefined);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [initial, setInitial] = React.useState(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => updateChosenOptions(options), [updateChosenOptions])

    const handleUnselect = React.useCallback((option: Option, shouldReturn?: boolean, prev?: Option[]) => {
        if (shouldReturn && prev) {
            return prev.filter((s) => s.value !== option.value);
        }
        updateChosenOptions((prev) => prev.filter((s) => s.value !== option.value));
    }, [updateChosenOptions]);

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        updateChosenOptions((prev) => {
                            const newSelected = [...prev];
                            newSelected.pop();
                            return newSelected;
                        });
                    }
                }
                // This is not a default behaviour of the <input /> field
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        [updateChosenOptions]
    );

    React.useEffect(() => {
        const element = document.getElementById("total-input")
        if (!element) {
            return;
        }
        const width = element.getBoundingClientRect().width;
        setInitial(false)
        setWidth(width - 50);
    }, [])



    return (
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-zinc-800"
            id="total-input"
            style={{
                width: (width) ? `${width}px` : undefined
            }}
        >
            <div className={"group rounded-md relative border-0 border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-0 focus-within:ring-ring focus-within:ring-offset-0 transition-all"}>
                <div className="flex flex-wrap gap-1">
                    {/* Avoid having the "Search" Icon */}
                    <Filter className="w-6 h-6 " />
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={"Select Categories"}
                        className="ml-0 flex-1 bg-transparent top-[0px] relative outline-none placeholder:text-white"
                    />
                    {(!!chosenOptions[0] && !initial) && <Badge variant="secondary" className="bg-zinc-900 hover:bg-zinc-900 rounded-sm" >
                        {chosenOptions.map(i => i.label).sort()[0]}
                        {chosenOptions.length > 1 && ` and ${chosenOptions.length - 1} other${(chosenOptions.length - 2) ? "s" : ""}`}
                    </Badge>}
                    {(!chosenOptions[0] && !initial) && <Badge variant="secondary" className="bg-zinc-900 hover:bg-zinc-900 text-red-500 rounded-sm" >
                        No Categories are Chosen
                    </Badge>}
                    {initial && <Badge id="size-badge" onClick={() => inputRef.current?.focus()} variant="secondary" style={{ userSelect: "none" }} className="bg-zinc-900 opacity-0 cursor-text hover:bg-zinc-900 rounded-sm">
                        {[...options, { value: "", label: "No Categories are Chosen" }].sort((a, b) => b.label.length - a.label.length)[0].label} {/* Largest Label */}
                        {` and ${options.length - 1} others`}
                    </Badge>}
                </div>
            </div>
            <div className={"relative top-2"}>
                <CommandList>
                    {open ? (
                        <div className="absolute top-0 z-10 w-full rounded-md border bg-zinc-900 text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto gap-2 flex flex-col">
                                {options.map((option, optionIndex) => {
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={() => {
                                                updateChosenOptions(prev => {
                                                    if (!!prev.find(o => o.value === option.value)) {
                                                        return handleUnselect(option, true, prev) as Option[];
                                                    }
                                                    setInputValue("");
                                                    return [...prev, option];
                                                })
                                            }}
                                            className={`cursor-pointer flex items-center gap-2 data-[selected='true']:bg-zinc-800  ${!!chosenOptions.find(o => o.value === option.value) ? "bg-zinc-800 brightness-125 data-[selected='true']:brightness-150" : ""} ${optionIndex ? "mt-1" : "mt-0"}`}
                                        >
                                            <Checkbox
                                                onToggle={(event) => {
                                                    // console.log(event.currentTarget)
                                                    if (event.newState === "open") {
                                                        updateChosenOptions((prev) => [...prev, option]);
                                                    } else {
                                                        handleUnselect(option)
                                                    }
                                                }}
                                                checked={!!chosenOptions.find(o => o.value === option.value)}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </div>
                    ) : null}
                </CommandList>
            </div>
        </Command>
    );
}

const StyledFancyMultiSelect = React.forwardRef<HTMLDivElement, {
    className?: string,
} & React.ComponentProps<typeof FancyMultiSelect>>(
    ({ ...props }, ref) => {
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
                className="p-[2px] rounded-lg transition duration-300 group/input"
            >
                <FancyMultiSelect {...props} />
            </motion.div>
        );
    }
);
StyledFancyMultiSelect.displayName = "Styled Fancy Multi Select";

export default StyledFancyMultiSelect;