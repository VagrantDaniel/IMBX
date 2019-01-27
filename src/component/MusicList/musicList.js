import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMusicListShow: false,
      playList: null,
    }
    // 打开音乐播放列表
    this.showMusicList = this.showMusicList.bind(this);
    // 关闭音乐播放列表
    this.closeDrawer = this.closeDrawer.bind(this);
    // 音乐播放列表点播
    this.musicDemand = this.musicDemand.bind(this);
    // 移除选中音乐
    this.wipeOffCur = this.wipeOffCur.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.currentMusic){
      return;
    }
    // 当上一个props 的歌曲和 这个 props 的歌曲一样时，直接返回
     const r =
       JSON.stringify(nextProps.playList) ===
       JSON.stringify(this.props.playList);
     if (r) {
       return;
     }
     this.setState(() => ({
       playList: nextProps.playList,
     }));
  }
  // 打开音乐播放列表事件
  showMusicList(){
    this.setState({
      isMusicListShow: !this.state.isMusicListShow,
    })
  }
  // 关闭音乐播放列表
  closeDrawer(){
    this.setState({
      isMusicListShow: !this.state.isMusicListShow,
    })
  }
  // 音乐播放列表点播
  musicDemand(){

  }
  // 移除选中音乐
  wipeOffCur(){

  }
  render() {
    return(
      <div className="musicList">
        <ReactCSSTransitionGroup transitionName="music-list-show"
          component="div"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <div className="drawer_mask"></div>
          {
            this.state.isMusicListShow && this.props.recommendSongsList ?
            <div className="drawerBox">
              <div className="header">
                <div className="lBtn">
                  <i className="iconfont btnType">&#xe619;</i><span>随机播放(30)</span>
                </div>
                <div className="rBtn">
                  <i className="iconfont collect">&#xe619;</i><span>收藏全部</span><span className="line">|</span><i className="iconfont delAll">&#xe619;</i>
                </div>
              </div>
              <ul className="music_list">
                {
                  this.state.playList.map((item,i) => {
                    return (
                      <li key={item.id} className={item.id === this.state.recommendSongIndex ?
                      'playing' : null} data-key={i} onClick={this.musicDemand}>
                        <i className="music_playing iconfont">&#xe619;</i>
                        <span className="music_name">{item.name}</span>
                        <span className="line">-</span>
                        <span className="artists">{item.artists ?
                          item.artists.map((item) => {
                            return item.name
                          }) : null
                        }</span>
                        <i className="music_close iconfont" onClick={this.wipeOffCur}>&#xe619;</i>
                      </li>
                    )
                  })
                }
              </ul>
              <div className="closeBtn" onClick={this.closeDrawer}>关闭</div>
            </div> : null
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('playList', state.reducer.playList)
  return {
    playList: state.reducer.playList,
    recommendSongIndex: state.reducer.recommendSongIndex,
  }
}

const mapDispatchToProps = (value) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
