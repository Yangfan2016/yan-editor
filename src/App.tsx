import * as React from 'react';
import RichEditor from "./components/RichEditor";
import Editor from "./core/editor";
import { Modal, Select, Icon, Tooltip, Menu, Dropdown } from 'antd';
import "antd/dist/antd.css";
import './css/App.css';
import { FONT_LEVEL_LIST, FONT_NAME_LIST, FONT_SIZE_LIST } from "./config/index"
import { TooltipButtonFormatBrush, TooltipButtonRemoveFormat, TooltipLabel, TooltipButton } from "./components/Wrapper";

let editor: any;
let { Option } = Select;

Modal.confirm({
  title:"提示",
  content:"你好"
});

class App extends React.Component {
  public state: any
  public FileMenu: any
  constructor(props: any) {
    super(props);

    this.state = {
      foreColor: "#333",
      backColor: "#333",
      fontName: "Microsoft Yahei",
      fontSize: 3, // normal
      fontLevel: "p",
    };

    this.FileMenu = (
      <Menu>
        <Menu.Item>
          <span className="menu-item">Save</span>
        </Menu.Item>
        <Menu.Item>
          <span className="menu-item">Share</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <span className="menu-item" onClick={this.execNormalCmd.bind(this, "print")}>Print</span>
        </Menu.Item>
      </Menu>
    );
  }
  // 协作
  public collabrateWork() {
    return 1; // TODO
  }
  // 初始化设置
  public resetConfig() {
    this.setState({
      foreColor: "#333",
      backColor: "#333",
      fontName: "Microsoft Yahei",
      fontSize: 3, // normal
      fontLevel: "p",
    });
  }
  // 去除格式
  public execRemoveFormat = () => {
    editor.execCmd("removeformat");
    // 恢复初始设置
    this.resetConfig();
  }
  // 格式刷
  public execForametMatch() {
    editor.execCmd("formatmatch");
  }
  // 普通操作
  public execNormalCmd(type: string, val?: string) {
    editor.execCmd(type, val);
  }
  // 下拉选择操作
  public selectFontLevel = (val: string) => {
    this.setState({
      fontLevel: val,
    }, () => {
      editor.execCmd("formatBlock", val);
    });
  }
  public selectFontSize = (val: string) => {
    this.setState({
      fontSize: val,
    }, () => {
      editor.execCmd("fontSize", val);
    });
  }
  public selectFontName = (val: string) => {
    this.setState({
      fontName: val,
    }, () => {
      editor.execCmd("fontName", val);
    });
  }
  // 颜色选择操作
  public selectForeColorChange = (ev: any) => {
    let val = ev.target.value;
    this.setState({
      foreColor: val,
    }, () => {
      editor.execCmd("foreColor", val);
    });
  }
  public selectBackColorChange = (ev: any) => {
    let val = ev.target.value;
    this.setState({
      backColor: val,
    }, () => {
      editor.execCmd("backColor", val);
    });
  }
  public render() {
    return (
      <div className="App">
        <div className="app-head">
          {/* controll-panel */}
          <div className="head-menu">
            <Dropdown overlay={this.FileMenu}>
              <span className="menu">File</span>
            </Dropdown>
            <span className="menu">Edit</span>
            <span className="menu">View</span>
            <span className="menu">Format</span>
          </div>
          <div className="head-controll">
            <div className="controll-group">
              <TooltipButton icon="undo" title="undo" onClick={this.execNormalCmd.bind(this, 'undo')} />
              <TooltipButton icon="redo" title="redo" onClick={this.execNormalCmd.bind(this, 'redo')} />
            </div>
            <div className="controll-group">
              <Tooltip placement="top" title="fontLevel">
                <Select defaultValue={this.state.fontLevel} style={{
                  width: 110,
                }}
                  onChange={this.selectFontLevel}>
                  {
                    FONT_LEVEL_LIST.map((font, n) => {
                      return (
                        <Option value={font.value} key={"" + n}>
                          {/* <span className={"editor-text--"+font.value}>{font.title}</span> */}
                          {font.title}
                        </Option>
                      );
                    })
                  }
                </Select>
              </Tooltip>
            </div>
            <div className="controll-group">
              <Tooltip placement="top" title="fontName">
                <Select defaultValue={this.state.fontName} style={{
                  width: 110,
                }}
                  onChange={this.selectFontName}>
                  {
                    FONT_NAME_LIST.map((font, n) => {
                      return (
                        <Option value={font.value} key={"" + n}>
                          <span style={{
                            fontFamily: font.value,
                          }}>{font.title}</span>
                        </Option>
                      );
                    })
                  }
                </Select>
              </Tooltip>
            </div>
            <div className="controll-group">
              <Tooltip placement="top" title="fontSize">
                <Select defaultValue={this.state.fontSize} style={{
                  width: 100,
                }}
                  onChange={this.selectFontSize}>
                  {
                    FONT_SIZE_LIST.map((font, n) => {
                      return (
                        <Option value={font.value} key={"" + n}>{font.title}</Option>
                      );
                    })
                  }
                </Select>
              </Tooltip>
            </div>
            <div className="controll-group">
              <TooltipButton icon="bold" title="bold" onClick={this.execNormalCmd.bind(this, 'bold')} />
              <TooltipButton icon="italic" title="italic" onClick={this.execNormalCmd.bind(this, 'italic')} />
              <TooltipButton icon="underline" title="underline" onClick={this.execNormalCmd.bind(this, 'underline')} />
              <TooltipButton icon="strikethrough" title="strikethrough" onClick={this.execNormalCmd.bind(this, 'strikethrough')} />
            </div>
            <div className="controll-group">
              <TooltipLabel title="foreColor">
                <label htmlFor="foreColor" className="yan-btn--label">
                  <Icon type="font-colors" />
                </label>
                <input type="color" id="foreColor" value={this.state.foreColor} onChange={this.selectForeColorChange} hidden={true} />
              </TooltipLabel>
              <TooltipLabel title="backColor">
                <label htmlFor="backColor" className="yan-btn--label">
                  <Icon type="bg-colors" />
                </label>
                <input type="color" id="backColor" value={this.state.backColor} onChange={this.selectBackColorChange} hidden={true} />
              </TooltipLabel>
            </div>
            <div className="controll-group">
              <TooltipButton icon="menu-unfold" title="indent" onClick={this.execNormalCmd.bind(this, 'indent')} />
              <TooltipButton icon="menu-fold" title="outdent" onClick={this.execNormalCmd.bind(this, 'outdent')} />
            </div>
            <div className="controll-group">
              <TooltipButton icon="align-center" title="align-center" onClick={this.execNormalCmd.bind(this, 'justifycenter')} />
              <TooltipButton icon="align-left" title="align-left" onClick={this.execNormalCmd.bind(this, 'justifyleft')} />
              <TooltipButton icon="align-right" title="align-right" onClick={this.execNormalCmd.bind(this, 'justifyright')} />
            </div>
            <div className="controll-group">
              <TooltipButton icon="scissor" title="cut" onClick={this.execNormalCmd.bind(this, 'cut')} />
              <TooltipButton icon="copy" title="copy" onClick={this.execNormalCmd.bind(this, 'copy')} />
            </div>
            <div className="controll-group">
              <TooltipButtonFormatBrush title="formatbrush" onClick={this.execForametMatch} />
              <TooltipButtonRemoveFormat title="removeformat" onClick={this.execRemoveFormat} />
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
