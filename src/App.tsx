import * as React from 'react';
import RichEditor from "./components/RichEditor";
import Editor from "./core/editor";
import { Tooltip, Menu, Dropdown, Button } from 'antd';
import "antd/dist/antd.css";
import './css/App.css';

let editor: any;


const FileMenu = (
  <Menu>
    <Menu.Item>
      <span className="menu-item">Print page</span>
    </Menu.Item>
    <Menu.Item>
      <span className="menu-item">Print</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <span className="menu-item">Print</span>
    </Menu.Item>
  </Menu>
);

const TooltipButton = (props: any) => {
  let { title, children, icon, onClick } = props;
  return (
    <Tooltip placement="bottom" title={title}>
      <Button icon={icon} onClick={onClick}>{children}</Button>
    </Tooltip>
  );
};



class App extends React.Component {
  public boldText = () => {
    editor.execCmd("bold");
  }
  public italicText = () => {
    editor.execCmd("italic");
  }
  public underlineText = () => {
    editor.execCmd("underline");
  }
  public strikeThroughText = () => {
    editor.execCmd("strikeThrough");
  }
  public indentParp = () => {
    editor.execCmd("indent");
  }
  public outdentParp = () => {
    editor.execCmd("outdent");
  }
  public justifyCenterText = () => {
    editor.execCmd("justifyCenter");
  }
  public justifyLeftText = () => {
    editor.execCmd("justifyLeft");
  }
  public justifyRightText = () => {
    editor.execCmd("justifyRight");
  }
  public cutContent = () => {
    editor.execCmd("cut");
  }
  public copyContent = () => {
    editor.execCmd("copy");
  }
  public undoOp = () => {
    editor.execCmd("undo");
  }
  public redoOp = () => {
    editor.execCmd("redo");
  }
  // TEST
  public insetPageHead=()=>{
    editor.execCmd("insertHTML",editor.renderPageHead());
  };
  public render() {
    return (
      <div className="App">
        <div className="app-head">
          {/* controll-panel */}
          <div className="head-menu">
            <Dropdown overlay={FileMenu}>
              <span className="menu">File</span>
            </Dropdown>
            <span className="menu">Edit</span>
            <span className="menu">View</span>
            <span className="menu">Format</span>
            <span className="menu" onClick={this.insetPageHead}>InsertPageHead(TEST)</span>
          </div>
          <div className="head-controll">
            <div className="controll-group">
              <TooltipButton icon="undo" title="undo" onClick={this.undoOp} />
              <TooltipButton icon="redo" title="redo" onClick={this.redoOp} />
            </div>
            <div className="controll-group">
              <TooltipButton icon="bold" title="bold" onClick={this.boldText} />
              <TooltipButton icon="italic" title="italic" onClick={this.italicText} />
              <TooltipButton icon="underline" title="underline" onClick={this.underlineText} />
              <TooltipButton icon="strikethrough" title="strikethrough" onClick={this.strikeThroughText} />
            </div>
            <div className="controll-group">
              <TooltipButton icon="menu-unfold" title="indent" onClick={this.indentParp} />
              <TooltipButton icon="menu-fold" title="outdent" onClick={this.outdentParp} />
            </div>
            <div className="controll-group">
              <TooltipButton icon="align-center" title="align-center" onClick={this.justifyCenterText} />
              <TooltipButton icon="align-left" title="align-left" onClick={this.justifyLeftText} />
              <TooltipButton icon="align-right" title="align-right" onClick={this.justifyRightText} />
            </div>
            <div className="controll-group">
              <TooltipButton icon="scissor" title="cut" onClick={this.cutContent} />
              <TooltipButton icon="copy" title="copy" onClick={this.copyContent} />
            </div>
          </div>
        </div>
        {/* editor-page */}
        <RichEditor />
      </div>
    );
  }
  public componentDidMount() {
    editor = new Editor("#editor");
  }
}

export default App;
