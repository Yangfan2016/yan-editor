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

        let isNeedSetDualTextDecoration = this.isHadDualDeclareTextStyleFormRange(range);
        if (isNeedSetDualTextDecoration) {
            styleDist["text-decoration-line"] = "underline line-through";
        }

        let addList = () => {
            let s = window.getSelection();
            let selectText = s.toString();
            let htmlTpl = '';
            let styleTpl = '';

            if (styleDist !== null) {
                for (let rule in styleDist) {
                    if (styleDist.hasOwnProperty(rule)) {
                        styleTpl += `${rule}:${styleDist[rule]};`;
                    }
                }
                htmlTpl = `<span style='${styleTpl}'>${selectText}</span>`;
            } else {
                htmlTpl = selectText;
            }

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
    public findAncestorElementByRange(range: Range) {
        let parent: any = range.startContainer.parentElement;

        if (parent.nodeType === 3) { // #text
            return parent;
        } else {
            let ancestorNode = null;
            while (!parent.classList.contains("editor--line")) {
                ancestorNode = parent;
                parent = parent.parentElement;
            }
            return ancestorNode;
        }
    }
    // for <strike /> and <u/>
    public isHadDualDeclareTextStyleFormRange(range: Range) {
        let parent: any = range.startContainer.parentElement;

        if (parent.nodeType === 3) { // #text
            return false;
        } else {
            let list: any = [];
            while (!parent.classList.contains("editor--line")) {
                list.push(parent.nodeName);
                parent = parent.parentElement;
            }
            return list.includes("U") && list.includes("STRIKE");
        }
    }
}

export default Editor;

