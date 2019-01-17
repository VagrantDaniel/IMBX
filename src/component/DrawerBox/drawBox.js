import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import './drawBox.scss';

class DrawerBox extends Component {
  constructor(props) {
    super(props);
    this.showDrawer = this.showDrawer.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {
      visible: false,
    }
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return(
      <div className="drawBox">
        <Drawer
          title="Basic Drawer"
          placement="bottom"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <ul className="feature_list">
            <li><i className="iconfont">&#xe60c;</i>下一首播放</li>
            <li><i className="iconfont">&#xe60c;</i>收藏到歌单</li>
            <li><i className="iconfont">&#xe60c;</i>下载</li>
            <li><i className="iconfont">&#xe60c;</i>评论</li>
            <li><i className="iconfont">&#xe60c;</i>分享</li>
            <li><i className="iconfont">&#xe60c;</i>歌手：</li>
            <li><i className="iconfont">&#xe60c;</i>专辑：</li>
            <li><i className="iconfont">&#xe60c;</i>查看视频</li>
            <li><i className="iconfont">&#xe60c;</i>不感兴趣</li>
          </ul>
        </Drawer>
      </div>
    )
  }
}

export default DrawerBox;
