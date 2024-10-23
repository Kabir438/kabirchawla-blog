"use client"

import { firaCode } from "@/app/fonts";
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
    return (
        <div className="relative mt-16 mb-8">
            {value.filename && <div className={cn("px-2 w-max rounded-tr-lg absolute top-0 h-8 z-50 !border-b-[#1c1c27] bg-[#1c1c27] -translate-y-[calc(100%_-_2px)] rounded-tl-lg left-[16px] [border:2px_solid_rgb(209,_213,_219)] border-b-0", firaCode.className)}>
                <span style={{
                    boxShadow: 'rgb(209, 213, 219) -1.7px 1.7px 0px 0px, rgb(28, 28, 39) -3px 3.7px 0px 1px',
                    bottom: '-0.276px',
                    right: '-1.7px',
                    left: 'unset',
                    transform: 'translate(100%)',
                    width: '8px'
                }} className="w-2 h-2 absolute -translate-x-full bottom-0 -left-[2px] rounded-bl-full border-white"></span>
                <span style={{
                    backgroundImage: '-webkit-linear-gradient(105deg, rgb(76, 167, 255) 30%, rgb(255, 93, 251) 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {value.filename}
                </span>
                <span style={{
                    boxShadow: 'rgb(209, 213, 219) 1.6px 1.5px 0px 0px, rgb(28, 28, 39) 3px 3px 0px 1px',
                    bottom: '-0.3px',
                    left: '-1.7px'
                }} className="w-2 h-2 absolute -translate-x-full bottom-0 -left-[2px] rounded-br-full border-white"></span>
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