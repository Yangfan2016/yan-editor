const SPECAIL_CMD_MODE: any = {
    bold() {
        return {
            "font-weight": "bolder",
        };
    },
    italic() {
        return {
            "font-style": "italic",
        };
    },
    underline() {
        return {
            "text-decoration": "underline",
        };
    },
    strikethrough() {
        return {
            "text-decoration": "line-through",
        };
    },
};
const FOAMAT_STYLE_LIST = [
    "font-size",
    "font-family",
    "font-weight",
    "font-style",
    "text-decoration",
    "background-color",
    "color",
];

class Editor {
    private static cacheRange: any
    public container: any
    public textLen: number
    constructor(el: string) {
        this.container = document.querySelector(el);

        if (this.container === null) {
            return;
        }

        this.textLen = 0;

        // init
        this.init();

    }
    public renderLine() {
        return '<div class="editor--line"></div><div class="editor--line"></div>';
    }
    public renderPageHead() {
        return '<div class="editor--page-head"></div>';
    }
    public init() {
        // init text
        this.container.innerHTML = this.renderLine();
        //  auto focus
        this.container.focus();
        // event
        this.container.addEventListener("keyup", (ev: any) => {
            let len = this.container.innerText.length;
            // delete
            if (ev.keyCode === 8) {
                if (len === 0) {
                    this.execCmd("insertHTML", this.renderLine());
                }
            }
            this.textLen = len;
        });
        this.container.addEventListener("blur", () => {
            // save range
            let s = window.getSelection();
            Editor.cacheRange = s.getRangeAt(0);
        });
    }
    public execCmd(type: string, value?: any) {
        // restore range
        let s = window.getSelection();
        s.removeAllRanges();
        s.addRange(Editor.cacheRange);
        // focus
        this.container.focus();
        let cmd = type.toLowerCase();
        // change some cmd [BUG]
        // let specialCmdList: any = Object.keys(SPECAIL_CMD_MODE);
        // if (specialCmdList.includes(cmd)) {
        //     return this.wrapperText(s, cmd);
        // }

        // [CMD] format match
        switch (cmd) {
            case "formatmatch":
                let r = s.getRangeAt(0);
                return this.formatMatch(r);
            default:
                break;
        }
        return document.execCommand(cmd, false, value);
    }
    public formatMatch(range: Range) {
        let parent: any = range.startContainer.parentElement;
        let styleDist: any = window.getComputedStyle(parent);
        styleDist = this.shiftSomeStyle(styleDist);

        let addList = () => {
            let s = window.getSelection();
            let selectText = s.toString();
            let htmlTpl = '';
            let styleTpl = '';

            for (let rule in styleDist) {
                if (styleDist.hasOwnProperty(rule)) {
                    styleTpl += `${rule}:${styleDist[rule]};`;
                }
            }

            htmlTpl = `<span style='${styleTpl}'>${selectText}</span>`;

            document.execCommand("insertHTML", false, htmlTpl);
            // remove mouseup
            document.removeEventListener("mouseup", addList);
        };
        // add moseup
        document.addEventListener("mouseup", addList);
    }
    public shiftSomeStyle(style: any): any {
        return FOAMAT_STYLE_LIST.reduce((res, rule) => {
            res[rule] = style[rule];
            return res;
        }, {});
    }
    public wrapperText(selection: any, cmd: string) {
        let range = selection.getRangeAt(0);
        let rangeDom = range.commonAncestorContainer;
        let mode = SPECAIL_CMD_MODE[cmd]();

        if (rangeDom && rangeDom.nodeType === 3) { // #text
            let wrapperBox = document.createElement("span");
            for (let rule in mode) {
                if (mode.hasOwnProperty(rule)) {
                    wrapperBox.style[rule] = mode[rule];
                }
            }
            range.surroundContents(wrapperBox);
        } else {
            for (let rule in mode) {
                if (mode.hasOwnProperty(rule)) {
                    let isHadStyle = window.getComputedStyle(rangeDom)[rule] === mode[rule];
                    if (isHadStyle) {
                        rangeDom.style[rule] = mode[rule];
                    } else {
                        rangeDom.style[rule] = "noraml";
                    }
                }
            }
        }
    }
}

export default Editor;

