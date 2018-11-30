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
        return '<div class="editor--line"></div>';
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
        return document.execCommand(type, false, value);
    }
}

export default Editor;

