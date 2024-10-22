"use client"
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import ReactYouTube from "react-youtube";

export default function Youtube({ className, ...props }: ComponentProps<typeof ReactYouTube>) {
    return (
        <div className="flex w-full justify-center my-8">
            <div className={cn(className, "[filter:url(#glow)] aspect-[700_/_360] rounded-xl overflow-hidden")}>
                <ReactYouTube {...props} iframeClassName="w-full aspect-[700_/_360]" className="max-w-full" />
            </div>
        </div>
    )
}