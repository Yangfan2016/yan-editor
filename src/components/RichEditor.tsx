import * as React from 'react';
import "../css/Editor.css";
import { debounce } from "../tools/debounceAndThrottle";

class RichEditor extends React.Component {
    public state: any
    public refEditorDom: any
    constructor(props: any) {
        super(props);
        this.state = {
            isEditMode: true,
            htmlString: "",
        };
        this.refEditorDom = React.createRef();
    }
    public autoFocusEditor = () => {
        let editorDom = this.refEditorDom.current;
        editorDom.focus();
    };
    public render() {
        return (
            <>
                <div id='editorbox'
                    className="editor-box"
                    onClick={this.autoFocusEditor}>
                    <div id="editor"
                        ref={this.refEditorDom}
                        className="editor-box-page"
                        contentEditable={this.state.isEditMode} />
                </div>
            </>
        );
    }
    public componentDidMount() {
        let ID = window.location.hash; // 用户 TEMP
        if (!ID) { // 没有用户id退出协作
            return;
        }
        let editorBox: any = document.getElementById("editorbox");
        let editorEle = this.refEditorDom.current;

        let ws: any = new WebSocket('ws://localhost:9696/chat');

        ws.addEventListener("message", ({ data }: any) => {
            let { html, pos, id } = JSON.parse(data);
            editorEle.innerHTML = html;
            // 生成鼠标标识
            let cursorFlag = document.getElementById(id);
            if (cursorFlag === null) {
                cursorFlag = document.createElement("div");
                cursorFlag.id = id;
                cursorFlag.className = "cursor--flag";
                cursorFlag.innerHTML = id;
                editorBox.appendChild(cursorFlag);
            }
            cursorFlag.style.cssText = `
                top:${pos.top - 20}px;
                left:${pos.left}px;
            `;

            // 光标放置最后
            let range = document.createRange();
            range.selectNodeContents(editorEle);
            range.collapse(false);
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        });
        ws.addEventListener("close", () => {
            window.console.log("unlink");
        });
        editorEle.addEventListener("mouseup",()=>{
            window.console.log("change");
        });
        editorEle.addEventListener("keydown", debounce(() => {
            let newStr = editorEle.innerHTML;
            if (newStr !== this.state.htmlString) {
                this.setState({
                    htmlString: newStr,
                });
                // 获取光标位置
                let s = window.getSelection();
                let r = s.getRangeAt(0);
                let rectRange = r.getBoundingClientRect();
                let rectEditorBox = editorBox.getBoundingClientRect();
                let top = rectRange.top - rectEditorBox.top;
                let left = rectRange.left - rectEditorBox.left;
                // 更新
                ws.send(JSON.stringify({
                    html: newStr,
                    pos: {
                        top,
                        left,
                    },
                    id: ID,
                }));
            }
        }, 1000));
    }
}

export default RichEditor;