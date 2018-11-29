import * as React from 'react';
import "../css/Editor.css";

class RichEditor extends React.Component {
    public state: any
    public refEditorDom:any
    constructor(props: any) {
        super(props);
        this.state = {
            isEditMode: true,
        };
        this.refEditorDom=React.createRef();
    }
    public autoFocusEditor=()=>{
        let editorDom=this.refEditorDom.current;
        editorDom.focus();
    };
    public render() {
        return (
            <>
                <div className="editor-box" onClick={this.autoFocusEditor}>
                    <div id="editor"
                        ref={this.refEditorDom}
                        className="editor-box-page"
                        contentEditable={this.state.isEditMode} />
                </div>
            </>
        );
    }
}

export default RichEditor;