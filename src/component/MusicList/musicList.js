import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { getChangeCurrentMusic, wipeOffCurMusic, changePlayMode, getChangePlayModeAction, } from '../../store/actionCreator';
import { PLAY_MODE_TYPES } from '../../common/js/config';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './musicList.scss';

class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMusicListShow: false,
      playList: null,
      currentIndex: 0,
      playMode: 0,
    }
    // 打开音乐播放列表
    this.showMusicList = this.showMusicList.bind(this);
    // 关闭音乐播放列表
    this.closeDrawer = this.closeDrawer.bind(this);
    // 音乐播放列表点播
    this.musicDemand = this.musicDemand.bind(this);
    // 移除选中音乐
    this.wipeOffCur = this.wipeOffCur.bind(this);
    // 切换音乐播放状态
    this.changePlayMode = this.changePlayMode.bind(this);
  }
  componentDidMount(){
      this.props.onRef1(this);
  }
  componentWillReceiveProps(nextProps){
    console.log(
      '1'
    )
    if(!nextProps.playList){
      console.log('2')
      return;
    }
    // 当上一个props 的歌曲和 这个 props 的歌曲一样时，直接返回
     const r =
       JSON.stringify(nextProps.playList) ===
       JSON.stringify(this.props.playList) && JSON.stringify(nextProps.playMode) ===
       JSON.stringify(this.props.playMode);
     if (r) {
       // return;
     }
     console.log('playList', nextProps.playList)
     this.setState(() => ({
       playList: nextProps.playList,
       currentIndex: nextProps.currentIndex,
       playMode: nextProps.playMode,
     }));
  }
  // 切换音乐播放模式
  changePlayMode(value) {
    switch (value) {
      case 0:
        message.info('列表循环');
        this.props.changePlayMode(value);
        break;
      case 1:
        message.info('随机播放');
        this.props.changePlayMode(value);
        break;
      case 2:
        message.info('单曲循环');
        this.props.changePlayMode(value);
        break;
      default:
        message.info('随机播放');
        this.props.changePlayMode(1);
        break;
    }
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
  musicDemand(e){
    let index = e.currentTarget.getAttribute('data-key');
    this.props.getChangeCurrentMusic(this.state.playList[index]);
  }
  // 移除选中音乐
  wipeOffCur(e){
    e.preventDefault();
    e.stopPropagation();
    let index = e.target.parentNode.getAttribute('data-key');
    // 删除的当前正在播放的音乐
    if(this.state.playList.length === 1){
      this.props.history.push('/mrtj');
    }else{
      this.props.wipeOffCur(index);
    }
  }
  render() {
    const { SEQUENCE_PLAY, RANDOM_PLAY, LOOP_PLAY } = PLAY_MODE_TYPES;
    return(
      <div className="musicList">
        <ReactCSSTransitionGroup transitionName="music-list-show"
          component="div"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <div className="drawer_mask" style={{display: this.state.isMusicListShow ? 'block' : 'none'}}></div>
          {
            this.state.isMusicListShow && this.state.playList ?
            <div className="drawerBox">
              <div className="header">
                <div className="lBtn">
                  {/*音乐播放模式*/}
                  {/*随机播放*/}
                  {
                    this.state.playMode == RANDOM_PLAY ?
                    <div>
                      <i className="iconfont btnMode rdMode" onClick={() => {this.changePlayMode(SEQUENCE_PLAY)}}>&#xe628;</i>
                      <span>随机播放({ this.state.playList.length })</span>
                    </div>
                    : ''
                  }
                  {/*列表循环*/}
                  {
                    this.state.playMode == SEQUENCE_PLAY ?
                    <div>
                      <i className="iconfont btnMode" onClick={() => {this.changePlayMode(LOOP_PLAY)}}>&#xe674;</i>
                      <span>列表循环({ this.state.playList.length })</span>
                    </div>
                    : ''
                  }
                  {/*单曲循环*/}
                  {
                    this.state.playMode == LOOP_PLAY ?
                    <div>
                      <i className="iconfont btnMode" onClick={() => {this.changePlayMode(RANDOM_PLAY)}}>&#xe61f;</i>
                      <span>单曲循环({ this.state.playList.length })</span>
                    </div>
                    : ''
                  }

                </div>
                <div className="rBtn">
                  <i className="iconfont collect">&#xe62d;</i><span>收藏全部</span><span className="line">|</span><i className="iconfont delAll">&#xe61a;</i>
                </div>
              </div>
              <ul className="music_list">
                {
                  this.state.playList.map((item,i) => {
                    return (
                      <li key={item.id} className={i === this.state.currentIndex ?
                      'playing' : null} data-key={i} onClick={this.musicDemand}>
                        <i className="music_playing iconfont">&#xe605;</i>
                        <span className="music_name">{item.name}</span>
                        <span className="line">-</span>
                        <span className="artists">{item.artists ?
                          item.artists.map((item) => {
                            return item.name
                          }) : null
                        }</span>
                        <i className="music_close iconfont" onClick={this.wipeOffCur}>&#xe66e;</i>
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
  return {
    playList: state.reducer.playList,
    currentIndex: state.reducer.currentIndex,
    playMode: state.reducer.playMode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChangeCurrentMusic(value) {
      dispatch(getChangeCurrentMusic(value));
    },
    wipeOffCur(value){
      dispatch(wipeOffCurMusic(value));
    },
    changePlayMode (value) {
      dispatch(getChangePlayModeAction(value));
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
