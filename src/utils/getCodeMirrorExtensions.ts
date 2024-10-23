import { css } from "@codemirror/lang-css";
import { go } from "@codemirror/lang-go";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { sass } from '@codemirror/lang-sass';
import { MySQL, sql }  from "@codemirror/lang-sql"
import { yaml }  from "@codemirror/lang-yaml"
import { StreamLanguage } from '@codemirror/language';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { xml } from '@codemirror/legacy-modes/mode/xml';
import { csharp } from "@replit/codemirror-lang-csharp";

export default function getCodeMirrorExtensions(language: string | undefined) {
    switch (language?.toLowerCase()) {
        case 'c#':
            return [csharp()]
        case 'css':
            return [css()]
        case 'go':
            return [go()]
        case 'groq':
            return []
        case 'html':
            return [html()]
        case 'javascript':
            return [javascript({
                jsx: false
            })]
        case 'java':
            return [java()]
        case 'json':
            return [json()]
        case 'jsx':
            return [javascript({
                jsx: true,
            })]
        case 'markdown':
            return [markdown()]
        case 'mysql':
            return [sql({
                dialect: MySQL
            })]
        case 'php':
            return [php()]
        case 'python':
            return [python()]
        case 'ruby':
            return [StreamLanguage.define(ruby)]
        case 'sass':
            return [sass({
                indented: true
            })]
        case 'scss':
            return [sass({
                indented: false
            })]
        case 'sh':
        case 'bash':
            return [StreamLanguage.define(shell)]
        case 'tsx':
            return [javascript({
                jsx: true,
                typescript: true
            })]
        case 'typescript':
            return [javascript({
                jsx: false,
                typescript: true
            })]
        case 'xml':
            return [StreamLanguage.define(xml)]
        case 'yaml':
            return [yaml()]
        default:
            return []
    }
}