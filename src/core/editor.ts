class Editor {
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
        this.container.innerHTML=this.renderLine();
        //  auto focus
        this.container.focus();
        // event
        this.container.addEventListener("keyup", (ev: any) => {
            let len = this.container.innerText.length;
            // delete
            if (ev.keyCode === 8) {
                if (len === 0) {
                    this.execCmd("insertHTML",this.renderLine());
                }
            }   
            this.textLen = len;
        });
    }
    public execCmd(type: string, value?: any) {
        return document.execCommand(type, false, value);
    }
}

export default Editor;

