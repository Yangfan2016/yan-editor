
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
        // use style css not html tag
        document.execCommand("styleWithCSS", true);
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
            case "print":
                return this.print();
            default:
                break;
        }
        return document.execCommand(cmd, false, value);
    }
    public formatMatch(range: Range) {
        let parent: any = range.startContainer.parentElement;
        let cssText: any = parent.style.cssText;

        let addList = () => {
            let s = window.getSelection();
            let r = s.getRangeAt(0);
            let p: any = r.startContainer.parentElement;
            let selectText = s.toString();

            // H标签特殊处理
            if (/^H[1-6]$/.test(p.nodeName)) {
                this.formatMatchHeading(cssText);
            } else {
                let htmlTpl = '';
                if (cssText !== null) {
                    htmlTpl = `<span style='${cssText}'>${selectText}</span>`;
                } else {
                    htmlTpl = selectText;
                }
                document.execCommand("insertHTML", false, htmlTpl);
            }
            // remove mouseup
            document.removeEventListener("mouseup", addList);
        };
        // add moseup
        document.addEventListener("mouseup", addList);
    }
    public formatMatchHeading(cssText: string) {
        let style: any = this.cssText2StyleDist(cssText);
        let textDecoration = style["text-decoration-line"];
        let isBold = style["font-weight"] === "bold";
        let isItalic = style["font-style"] === "italic";
        let isUnderline = textDecoration.indexOf("underline") !== -1;
        let isStrkeThrough = textDecoration.indexOf("line-through") !== -1;
        let fontName = style["font-family"];
        let foreColor = style.color;
        let backColor = style["background-color"];
        let isSet = false;

        switch (true) {
            case isBold:
                isSet = document.queryCommandState("bold");
                if (!isSet) {
                    document.execCommand("bold", false);
                }
            case isItalic:
                isSet = document.queryCommandState("italic");
                if (!isSet) {
                    document.execCommand("italic", false);
                }
            case isStrkeThrough:
                isSet = document.queryCommandState("strikethrough");
                if (!isSet) {
                    document.execCommand("strikethrough", false);
                }
            case isUnderline:
                isSet = document.queryCommandState("underline");
                if (!isSet) {
                    document.execCommand("underline", false);
                }
            case fontName !== "":
                document.execCommand("fontname", false, fontName);
            case foreColor !== "":
                document.execCommand("forecolor", false, foreColor);
            case backColor !== "":
                document.execCommand("backcolor", false, backColor);
            default:
                break;
        }
    }
    public cssText2StyleDist(cssText: string) {
        return cssText.split(";").filter(item => (item !== "")).reduce((obj, item) => {
            let d = item.trim().split(":");
            obj[d[0]] = d[1].trim();
            return obj;
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

        if (parent === null) {
            return false;
        }
        if (parent.nodeType === 3) { // #text
            return false;
        }

        let list: any = [];
        while (!parent.classList.contains("editor--line")) {
            list.push(parent.nodeName);
            parent = parent.parentElement;
        }
        return list.includes("U") && list.includes("STRIKE");
    }
    // print 
    public print() {
        let iframe: any = document.getElementById("YF_IFR_FOR_EDITOR");
        if (iframe == null) {
            iframe = document.createElement("iframe");
            iframe.id = "YF_IFR_FOR_EDITOR";
            iframe.style.display = "none";
            document.body.appendChild(iframe);
        }
        iframe.contentDocument.body.innerHTML = this.container.innerHTML;
        iframe.contentWindow.print();
    }
}

export default Editor;

