"use client"

import getCodeMirrorExtensions from "@/utils/getCodeMirrorExtensions";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
import CodeMirror from "@uiw/react-codemirror"

export default function Code({ value }: {
    value: {
        code: string;
        language: string;
    }
}) {
    return (
        <CodeMirror
            value={value.code}
            extensions={getCodeMirrorExtensions(value.language)}
            theme={tokyoNight}
            readOnly={true}
            basicSetup={{
                lineNumbers: true,
                highlightActiveLine: false,
            }}
            className="rounded-xl my-8 overflow-hidden text-gray-300"
            style={{ fontSize: "16px", border: "2px solid rgb(209, 213, 219)", filter: "url(#glow)" }}
        />
    )
}