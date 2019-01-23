
import { message } from 'antd';
import { getRecommendSongIndex, getAudio, updateRecommendSongList, updatePlayNext, updateCurrentMusicLyric } from '../../store/actionCreator';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { If } from 'react-if';
import './musicPlayer.scss';

let rotateTimer = 0;
class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    console.log('props', this.props )


    // 打开音乐播放列表
    this.showMusicList = this.showMusicList.bind(this);
    // 关闭音乐播放列表
    this.closeDrawer = this.closeDrawer.bind(this);
    // 音乐播放列表点播
    this.musicDemand = this.musicDemand.bind(this);
    // 移除选中音乐
    this.wipeOffCur = this.wipeOffCur.bind(this);
    //销毁音乐
    this.stopM = this.stopM.bind(this);
    this.playProgress = this.playProgress.bind(this);
    // 播放类型
    this.renderPlayType = this.renderPlayType.bind(this);
    this.playType = this.playType.bind(this);
    this.randomPlay = this.randomPlay.bind(this);
  }

  componentDidMount(){

  }
  renderPlayType(){
    // 单曲循环
    if(parseInt(this.props.playType) === 0){
      return (<a href="javascript:;" className="iconfont btnType" onClick={this.playType(0)}>&#xe619;</a>);
    }
    // 列表循环
    if(parseInt(this.props.playType) === 1){
      return (<a href="javascript:;" className="iconfont btnType" onClick={this.playType(1)}>&#xe619;</a>);
    }
    /*随机循环*/
    if(parseInt(this.props.playType) === 2){
      return (<a href="javascript:;" className="iconfont btnType" onClick={this.playType(2)}>&#xe600;</a>);
    }
  }
  // 销毁音乐
  stopM () {
    let audio = this.refs.audio;
    // audio.
    // audio.removeEventListener('timeupdate',this.playProgress);
  }
  // 播放类型
  playType(type){
    switch (type) {
      case 0:
        message.info('单曲循环');
        this.props.updatePlayNext(type);
      break;
      case 1:
        message.info('列表循环');
        this.props.updatePlayNext(type);
        break;
      case 2:
        message.info('随机播放');
        this.props.updatePlayNext(type);
        break;
      default:
        break;
    }
  }
  // 随机播放
  randomPlay(index){
      this.setState({
        currentMusic: this.props.recommendSongsList[index]
      },() => {
        getSongUrl(this.state.currentMusic.id).then((res) => {
          let url = res.data.data[0].url;
          this.setState({
            songUrl: url,
          })
          this.props.updateRecommendSongIndex(index);
        }).then(() => {
          this.play();
        });
      })
  }
  /*播放上一首*/
  playLast(){
    this.setState({
      angle: 0
    })
    if(!this.state.songUrl){
      return;
    }
    let _this = this;
    if(this.props.recommendSongIndex > 0){
      this.setState({
        currentMusic: this.props.recommendSongsList[this.props.recommendSongIndex - 1]
      },() => {
        axios.all([getSongUrl(this.state.currentMusic.id),getSongLyric(this.state.currentMusic.id)])
        .then(axios.spread(function (acct, perms) {
            let url = acct.data.data[0].url;
            _this.setState({
              songUrl: url,
            });
            _this.props.updateRecommendSongIndex(_this.props.recommendSongIndex - 1);
            let lyric = perms.data.lrc.lyric;
            _this.props.updateCurrentMusicLyric(lyric);

        })).then(() => {
          _this.props.getAudio(this.refs.audio, this.refs.played, this.refs.buffered);
        }).then(() => {
          _this.play();
        });
      })
    }else{
      this.setState({
        currentMusic: this.props.recommendSongsList[this.props.recommendSongsList.length - 1]
      },() => {
        axios.all([getSongUrl(this.state.currentMusic.id),getSongLyric(this.state.currentMusic.id)])
        .then(axios.spread(function (acct, perms) {
            let url = acct.data.data[0].url;
            _this.setState({
              songUrl: url,
            });
            _this.props.updateRecommendSongIndex(_this.props.recommendSongIndex - 1);
            let lyric = perms.data.lrc.lyric;
            _this.props.updateCurrentMusicLyric(lyric);

        })).then(() => {
          _this.props.getAudio(this.refs.audio, this.refs.played, this.refs.buffered);
        }).then(() => {
          _this.play();
        });
      })
    }
  }

  /*播放当前选中音乐*/
  play(){
    let audio = this.refs.audio;
    if(audio.paused && this.state.songUrl){
      audio.play();
      this.setState({
        isPlayed: true
      },() => {
        // rotateTimer = setInterval(() => {
        //   this.setState({
        //     angle: this.state.angle + 1
        //   },() => {
        //     this.refs.musicAvator.style.transform = `rotate(${this.state.angle}deg)`;
        //   })
        // }, 33)
      })
    }else{
      audio.pause();
      this.setState({
        isPlayed: false
      }, () => {
        // clearInterval(rotateTimer);
      })
    }

    // audio.addEventListener('timeupdate',this.playProgress)
  }
  playProgress(e){
    // 设置播放进度条
    // let audio = this.props.audio;
    // let audio = this.refs.audio;
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
      remainTime: this.formatTime(remainTime),
      currentTime: this.formatTime(current_time),
    });
    if(e.target.ended){
      switch (this.props.playType) {
        case 0:
          this.play();
          break;
        case 1:
          this.playNext();

        case 2:
          let len = this.props.recommendSongsList.length - 1;
          let random = parseInt(Math.random() * len);
          if(random === this.props.recommendSongIndex && this.props.recommendSongIndex != len){
            random += 1;
          }
          this.randomPlay();
          this.updatePlayNext(2);
        default:
          this.playNext();
      }
    }
  }
  /*播放下一首*/
  playNext(){
    this.setState({
      angle: 0
    });
    if(!this.state.songUrl){
      return;
    }
    let _this = this;
    if(this.props.recommendSongIndex < this.props.recommendSongsList.length - 1){
      this.setState({
        currentMusic: this.props.recommendSongsList[this.props.recommendSongIndex + 1]
      },() => {
        axios.all([getSongUrl(this.state.currentMusic.id),getSongLyric(this.state.currentMusic.id)])
        .then(axios.spread(function (acct, perms) {
            let url = acct.data.data[0].url;
            _this.setState({
              songUrl: url,
            });
            _this.props.updateRecommendSongIndex(_this.props.recommendSongIndex - 1);
            let lyric = perms.data.lrc.lyric;
            _this.props.updateCurrentMusicLyric(lyric);

        })).then(() => {
          _this.props.getAudio(this.refs.audio, this.refs.played, this.refs.buffered);
        }).then(() => {
          _this.play();
        });
      });
    }else{
      this.setState({
        currentMusic: this.props.recommendSongsList[0]
      },() => {
        axios.all([getSongUrl(this.state.currentMusic.id),getSongLyric(this.state.currentMusic.id)])
        .then(axios.spread(function (acct, perms) {
            let url = acct.data.data[0].url;
            _this.setState({
              songUrl: url,
            });
            _this.props.updateRecommendSongIndex(_this.props.recommendSongIndex - 1);
            let lyric = perms.data.lrc.lyric;
            _this.props.updateCurrentMusicLyric(lyric);

        })).then(() => {
          _this.props.getAudio(this.refs.audio, this.refs.played, this.refs.buffered);
        }).then(() => {
          _this.play();
        });
      })
    }
  }
  // pc鼠标放开事件
  mouseUp(){
    this.setState({
      mouseDown: false,
    })
  }
  // pc鼠标落下事件
  mouseDown(){
    this.setState({
      mouseDown: true,
    })
  }
  // pc鼠标离开事件
  mouseLeave(){
    this.setState({
      mouseDown: false,
    })
  }
  // pc鼠标点击事件
  clickChangeTime(e){
    if(!e.pageX){
      return;
    }
    this.setTimeOnPc(e);
  }
  // pc鼠标移动改变播放进度
  progressChangeTime(e){
    if(this.state.mouseDown){
      this.setTimeOnPc(e);
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
    if(this.props.recommendSongIndex !== index){
      let _this = this;
      this.setState({
        currentMusic: this.props.recommendSongsList[index]
      },() => {
        axios.all([getSongUrl(this.state.currentMusic.id),getSongLyric(this.state.currentMusic.id)])
        .then(axios.spread(function (acct, perms) {
            let url = acct.data.data[0].url;
            _this.setState({
              songUrl: url,
            });
            _this.props.updateRecommendSongIndex(_this.props.recommendSongIndex - 1);
            let lyric = perms.data.lrc.lyric;
            _this.props.updateCurrentMusicLyric(lyric);

        })).then(() => {
          _this.props.getAudio(this.refs.audio, this.refs.played, this.refs.buffered);
        }).then(() => {
          _this.play();
        });
      })
    }else{
    }
  }
  // 移除选中音乐
  wipeOffCur(e) {
    e.preventDefault();
    e.stopPropagation();
    let index = e.target.parentNode.getAttribute('data-key');
    // 删除的当前正在播放的音乐
    let _this = this;
    if(this.props.recommendSongsList.length === 1){
      let audio = this.refs.audio;
      audio.removeEventListener('timeupdate',this.playProgress);
      this.props.history.push('/mrtj');
    }else if(index === this.props.recommendSongIndex){
      // 删除的是正在播放的音乐并且不是最后一个
      if(index < this.props.recommendSongsList.length - 1){
        this.setState({
          currentMusic: this.props.recommendSongsList[parseInt(index) + 1]
        },() => {
          axios.all([getSongUrl(this.state.currentMusic.id),getSongLyric(this.state.currentMusic.id)])
          .then(axios.spread(function (acct, perms) {
              let url = acct.data.data[0].url;
              _this.setState({
                songUrl: url,
              });
              _this.props.updateRecommendSongIndex(_this.props.recommendSongIndex - 1);
              let lyric = perms.data.lrc.lyric;
              _this.props.updateCurrentMusicLyric(lyric);

          })).then(() => {
            _this.props.getAudio(this.refs.audio, this.refs.played, this.refs.buffered);
          }).then(() => {
            _this.play();
          });
        })
      }else{
        // 删除的是正在播放的音乐并且是最后一个
        this.setState({
          currentMusic: this.props.recommendSongsList[0]
        },() => {
          axios.all([getSongUrl(this.state.currentMusic.id),getSongLyric(this.state.currentMusic.id)])
          .then(axios.spread(function (acct, perms) {
              let url = acct.data.data[0].url;
              _this.setState({
                songUrl: url,
              });
              _this.props.updateRecommendSongIndex(_this.props.recommendSongIndex - 1);
              let lyric = perms.data.lrc.lyric;
              _this.props.updateCurrentMusicLyric(lyric);

          })).then(() => {
            _this.props.getAudio(this.refs.audio, this.refs.played, this.refs.buffered);
          }).then(() => {
            _this.play();
          });
        })
      }
    }else if(index < this.props.recommendSongIndex){
      // 删除的不是正在播放的音乐并且是正在播放音乐靠前的
      this.props.recommendSongsList.splice(index,1);
      updateRecommendSongList(this.props.recommendSongsList);
      this.setState({
        currentMusic: this.props.recommendSongsList[this.props.recommendSongIndex - 1],
      },() => {
        getSongUrl(this.state.currentMusic.id).then((res) => {
          let url = res.data.data[0].url;
          this.setState({
            songUrl: url,
          })
          _this.props.updateRecommendSongIndex(_this.props.recommendSongIndex - 1);
          let audio = this.refs.audio;
          audio.play();
        }).then(() => {
          this.play();
        }).then(() => {
          // 要执行两遍
          this.play();
        });
      })
    }else{
      // 删除的不是正在播放的音乐并且是正在播放音乐后面的
      this.props.recommendSongsList.splice(index,1);
      updateRecommendSongList(this.props.recommendSongsList);
    }
  }

  render(){
    const Ftype = (type) => {
      console.log('type', type, typeof type)
      switch (type) {
        case 0:
          return (<a href="javascript:;" className="iconfont btnType" onClick={this.playType(0)}>&#xe619;</a>);
          break;
        case 1:
          return (<a href="javascript:;" className="iconfont btnType" onClick={this.playType(1)}>&#xe619;</a>);
          break;
        case 2:
          return (<a href="javascript:;" className="iconfont btnType" onClick={this.playType(2)}>&#xe600;</a>);
          break;
        default:
          return (<a href="javascript:;" className="iconfont btnType" onClick={this.playType(0)}>&#xe619;</a>);
          break;
      }
    };
    return(
      <div className="reactMusicPlayer" id="reactMusicPlayer">

          {/*歌词展示*/}
          <div className="toolBtnList">
          {/*喜爱*/}
            <a href="javascript:;" className="iconfont fav" onClick={this.playLast}>&#xe619;</a>
            {/*下载*/}
            <a href="javascript:;" className="iconfont download" onClick={this.playLast}>&#xe619;</a>
            {/*相关视频*/}
            <a href="javascript:;" className="iconfont video" onClick={this.playLast}>&#xe619;</a>
            {/*评论*/}
            <a href="javascript:;" className="iconfont comments" onClick={this.playLast}>&#xe619;</a>
            {/*详情*/}
            <a href="javascript:;" className="iconfont pointList" onClick={this.playLast}>&#xe619;</a>
          </div>

        </div>

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
                  this.props.recommendSongsList.map((item,i) => {
                    return (
                      <li key={item.id} className={item.id === this.state.currentMusic.id ?
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
  console.log('state', state);
  return{
    recommendSongsList: state.reducer.recommendSongsList,
    recommendSongIndex: state.reducer.recommendSongIndex,
    audio: state.reducer.audio,
    played: state.reducer.played,
    buffered: state.reducer.buffered,
    playType: state.reducer.playType,
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    updateRecommendSongIndex(value){
      dispatch(getRecommendSongIndex(value));
    },
    getAudio(value){
      dispatch(getAudio(value));
    },
    updateRecommendSongList(value){
      dispatch(updateRecommendSongList(value));
    },
    updatePlayNext(value){
      dispatch(updatePlayNext(value));
    },
    updateCurrentMusicLyric(value){
      dispatch(updateCurrentMusicLyric(value));
    }
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusicPlayer)
);
