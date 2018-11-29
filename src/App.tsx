import * as React from 'react';
import RichEditor from "./components/RichEditor";
import Editor from "./core/editor";
import { Menu, Dropdown, Button } from 'antd';
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
          </div>
          <div className="head-controll">
            <div className="controll-group">
              <Button icon="undo" onClick={this.undoOp} />
              <Button icon="redo" onClick={this.redoOp} />
            </div>
            <div className="controll-group">
              <Button icon="bold" onClick={this.boldText} />
              <Button icon="italic" onClick={this.italicText} />
              <Button icon="underline" onClick={this.underlineText} />
              <Button icon="strikethrough" onClick={this.strikeThroughText} />
            </div>
            <div className="controll-group">
              <Button icon="align-center" onClick={this.justifyCenterText} />
              <Button icon="align-left" onClick={this.justifyLeftText} />
              <Button icon="align-right" onClick={this.justifyRightText} />
            </div>
            <div className="controll-group">
              <Button icon="scissor" onClick={this.cutContent} />
              <Button icon="copy" onClick={this.copyContent} />
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
