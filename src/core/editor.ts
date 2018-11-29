class Editor {
    public container: any
    constructor(el: string) {
        this.container = document.querySelector(el);

        if (this.container === null) {
            return;
        }

        // init
        this.init();

    }
    public init() {
        this.container.focus();


        // document.addEventListener("keydown",ev=>{
        //     let isEnterKey=ev.keyCode===13;
        //     if (isEnterKey) {
        //         let selection=window.getSelection();
        //         let range=selection.getRangeAt(0);
        //         let {bottom}=range.getBoundingClientRect();
        //         if (bottom>500) {
        //             this.execCmd("insertHTML",`<div class="editor-box">&nbsp;</div>`);
        //         }
        //     }
        // });
    }
    public execCmd(type: string, value?: any) {
        return document.execCommand(type, false, value);
    }
}

export default Editor;

