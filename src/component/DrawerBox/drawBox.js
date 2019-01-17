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
      songsName: '',
      singerName: '',
      alnum: '',
    }
  }
  showDrawer = (d1,d2,d3) => {
    this.setState({
      visible: true,
      songsName: d1,
      singerName: d2,
      alnum: d3
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
          title={this.state.songsName ? '歌曲：'+this.state.songsName : null}
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
            <li><i className="iconfont">&#xe60c;</i>歌手：{this.state.singerName}</li>
            <li><i className="iconfont">&#xe60c;</i>专辑：{this.state.album}</li>
            <li><i className="iconfont">&#xe60c;</i>查看视频</li>
            <li><i className="iconfont">&#xe60c;</i>不感兴趣</li>
          </ul>
        </Drawer>
      </div>
    )
  }
}

export default DrawerBox;
