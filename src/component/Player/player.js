/**
 * Player 组件
 * 只负责歌曲的播放，以及控制歌曲的播放模式
 * 不用关心歌曲列表，以及歌曲的播放顺序的逻辑处理
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChangePlayingStatusAction, playPrevMusicAction, playNextMusicAction, getChangePlayModeAction } from '../../store/actionCreator';
import { PLAY_MODE_TYPES } from '../../common/js/config';
import { formatTime } from '../../common/js/util';
import './player.scss';

const PLAYING_STATUS = {
  playing: true,
  paused: false
};
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*时间*/
      totalTime: 0,
      currentTime: 0,
      remainTime: 0,
      /*百分比*/
      playPer: 0,
      bufferPer: 0,
      /*头像旋转角度*/
      angle: 0,
      /*当前播放音乐信息*/
      currentMusic: {},
      /*是否播放*/
      isPlayed: false,
      // 进度条距左侧宽度
      playedLeft: 0,
      //音量控件距左侧宽度
      volumeLeft: 0,
      // 是否禁音
      quitVolume: false,
      /*播放列表是否显示*/
      musicListShow: false,
      /*判断鼠标是否落下*/
      mouseDown: false,
      // 音量
      // 是否打开音乐播放列表
      isMusicListShow: false,
    };
    // 更新进度条播放时间
    this.playProgress = this.playProgress.bind(this);
    // 进度条控制鼠标按下事件
    // this.mouseDown = this.mouseDown.bind(this);
    // 进度条控制鼠标放开事件
    // this.mouseUp = this.mouseUp.bind(this);
    // 点击进度条事件
    // this.clickChangeTime = this.clickChangeTime.bind(this);
    // 拖动进度条事件
    this.progressChangeTime = this.progressChangeTime.bind(this);
    // 进度条控制鼠标离开事件
    // this.mouseLeave = this.mouseLeave.bind(this);


    // 播放当前选中音乐
    this.handleChangePlayingStatus = this.handleChangePlayingStatus.bind(this);
  }
  componentWillReceiveProps(nextProps){
    const audio = this.refs.audio;
    if(!nextProps.currentMusic){
      return;
    }
    // 当上一个props 的歌曲和 这个 props 的歌曲一样时，直接返回
     const r =
       JSON.stringify(nextProps.currentMusic) ===
       JSON.stringify(this.props.currentMusic);
     if (r) {
       return;
     }
     this.setState(() => ({
       currentMusic: nextProps.currentMusic,
     }));
     audio.addEventListener('canplay', () => {
         // 获取总时间
         let totalTime = parseInt(audio.duration);
         this.setState({
           totalTime: formatTime(totalTime),
           remainTime: formatTime(totalTime),
           currentTime: formatTime(0),
           playedLeft: this.refs.played.getBoundingClientRect().left,
           // volumeLeft: this.refs.volume.getBoundingClientRect().left,
         })
       // this.refs.volume.style.width = '50%';
     });
     // 设置初始音量
     audio.volume = 0.5;
     audio.addEventListener('timeupdate',this.playProgress);
  }
  componentWillUnmount(){
    const audio = this.refs.audio;
    audio.removeEventListener('timeupdate',this.playProgress);
  }

  // 拖动进度条事件
  progressChangeTime(e){
    const audio = this.refs.audio;
    let percent = (e.clientX - this.state.playedLeft) / this.refs.progress.offsetWidth;
    this.refs.played.style.width = percent * 100 + '%';
    audio.currentTime = percent * audio.duration;
    this.props.getChangePosLyric(audio.currentTime);
  }
  // 播放当前选中音乐
  handleChangePlayingStatus (status) {
    const audio = this.refs.audio;
    this.props.changePlayingStatus(status);
    if (status == PLAYING_STATUS.playing) {
      audio.play();
    } else {
      audio.pause();
    }
    // 如果歌曲详情已经显示了，就对歌词进行暂停
    if (this.props.showMusicDetail) {
      this.refs.musicDetail.togglePlay();
    }
  }
  playProgress(e){
    const audio = this.refs.audio;
    // 设置播放进度条
    const { currentTime, duration, buffered } = e.target;
    let playPer = currentTime / duration;
    this.refs.played.style.width = playPer*100 + '%';
    // 设置缓冲进度条
    let bufferedTime = 0;
    let bufferedRanges = buffered;
    if(bufferedRanges.length){
      // audio.buffered.end(0)
      bufferedTime = bufferedRanges.end(bufferedRanges.length - 1);
    }
    let bufferPer = bufferedTime / duration;
    this.refs.buffered.style.width = bufferPer*100 + '%';
    // 设置剩余时间
    let remainTime = parseInt(duration - currentTime);
    let current_time = parseInt(currentTime);
    this.setState({
      remainTime: formatTime(remainTime),
      currentTime: formatTime(current_time),
    });
    if(audio.ended){
      this.props.playNextMusic();
    }
  }
  render() {
    return(
      <div className="reactMusicPlayer" id="reactMusicPlayer">
        {/*播放进度条*/}
        <div className="progress_wrapper"
           onClick={this.clickChangeTime}
           onMouseDown={this.mouseDown}
           onMouseMove={this.progressChangeTime}
           onMouseUp={this.mouseUp}
           onMouseLeave={this.mouseLeave}>
          <div className="m_currentTime">{this.state.currentTime}</div>
          <div className="progress" ref="progress">
            <div className="progress_buffered" ref='buffered'></div>
            <div className="progress_played" ref='played'></div>
          </div>
          <div className="m_totalTime">{this.state.totalTime}</div>
        </div>
        {/*控制按钮*/}
        <div className="control">
          {/*上一首*/}
          <a href="javascript:;" className="iconfont btnNext" onClick={this.props.playPrevMusic}>&#xe619;</a>
          {/*播放*/}
          {
            this.props.playing ?
              <a href="javascript:;" className="iconfont btnPlay" onClick={ () => this.handleChangePlayingStatus(PLAYING_STATUS.paused) }>&#xe69d;</a> :
              <a href="javascript:;" className="iconfont btnPause" onClick={ () => this.handleChangePlayingStatus(PLAYING_STATUS.playing) }>&#xe600;</a>
          }
          {/*下一首*/}
          <a href="javascript:;" className="iconfont btnNext" onClick={this.props.playNextMusic}>&#xe61b;</a>
          {/*音乐列表*/}
          <a href="javascript:;" className="iconfont musicList" onClick={this.props.showMusicList}>&#xe607;</a>
        </div>
        <audio autoPlay src={this.state.currentMusic ? this.state.currentMusic.musicUrl : ''}
            ref="audio"
            onTimeUpdate={this.playProgress}></audio>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    playing: state.reducer.playing,
    playList: state.reducer.playList,
    // playMode: state.reducer.playMode,
    currentMusic: state.reducer.currentMusic,
    currentMusicSrc: state.reducer.currentMusicSrc,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePlayingStatus (value) {
      dispatch(getChangePlayingStatusAction(value));
    },
    changePlayMode (value) {
      dispatch(getChangePlayModeAction(value));
    },
    playPrevMusic () {
      dispatch(playPrevMusicAction());
    },
    playNextMusic () {
      dispatch(playNextMusicAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
