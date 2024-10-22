"use client"

import { firaCode } from "@/app/post/[slug]/page";
import { cn } from "@/lib/utils";
import getCodeMirrorExtensions from "@/utils/getCodeMirrorExtensions";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
import CodeMirror from "@uiw/react-codemirror"

export default function Code({ value }: {
    value: {
        code: string;
        language: string;
        filename?: string | undefined;
    }
}) {
    console.log("value", value)
    return (
        <div className="relative mt-16 mb-8">
            {value.filename && <div className={cn("px-2 w-max rounded-tr-lg absolute top-0 h-8 z-50 !border-b-[#1c1c27] bg-[#1c1c27] -translate-y-[calc(100%_-_2px)] rounded-tl-lg left-[16px] [border:2px_solid_rgb(209,_213,_219)] border-b-0", firaCode.className)}>
                {value.filename}
                <span className="w-2 h-2 absolute -translate-x-full bottom-0 -left-[2px] rounded-br-full border-white"></span>
            </div>}
            <CodeMirror
                value={value.code}
                extensions={getCodeMirrorExtensions(value.language)}
                theme={tokyoNight}
                readOnly={true}
                basicSetup={{
                    lineNumbers: true,
                    highlightActiveLine: false,
                }}
                className="rounded-xl overflow-hidden text-gray-300"
                style={{ fontSize: "16px", border: "2px solid rgb(209, 213, 219)", filter: "url(#glow)" }}
            />
        </div>
    )
}