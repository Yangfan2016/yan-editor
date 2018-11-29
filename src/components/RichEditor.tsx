import * as React from 'react';
import "../css/Editor.css";

class RichEditor extends React.Component {
    public state: any
    constructor(props: any) {
        super(props);
        this.state = {
            isEditMode: true,
        };
    }
    public render() {
        return (
            <>
                <div className="editor-box">
                    <div id="editor"
                        className="editor-box-page"
                        contentEditable={this.state.isEditMode} />
                </div>
            </>
        );
    }
}

export default RichEditor;