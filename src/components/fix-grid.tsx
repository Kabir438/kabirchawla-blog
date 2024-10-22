"use client"
import { useEffect, useRef } from "react";

export default function FixGrid({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full mt-14 flex flex-wrap gap-4 [row-gap:1rem] justify-evenly items-center">
            {children}
        </div>
    )
}