import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lyric from 'lyric-parser';
import './musicLyric.scss';

class MusicLyric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 音乐歌词
      lyric: null,
      noLyric: false,
      // 当前歌词行数
      currentLineNum: 0,
      musicTime: 0,
    }
  }
  componentDidMount(){
    this.mount = true;
    this.props.onRef(this);
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.currentMusicLyric){
      return;
    }
    // 当上一个props 的歌词和 这个 props 的歌词一样时，直接返回
     const r =
       JSON.stringify(nextProps.currentMusicLyric) ===
       JSON.stringify(this.props.currentMusicLyric);
     if (r) {
       return;
     }

     // 这个时候歌词已经发生了变化
     if (this.state.lyric !== null) {
       // 如果之前已经有被处理过的歌词的话，先将原来的歌词暂停
       this.state.lyric.stop();
     }
    if(this.mount){
      let lyric = new Lyric(nextProps.currentMusicLyric.lrc.lyric,this.handleLyric);
      this.setState(() => ({
        lyric: lyric,
        noLyric: false
      }),
      () => {
        // 初始化完成之后，播放当前歌词
        this.state.lyric.play();
        this.refs.lyricList.scrollTo(0, 0);
      });
    }
  }
  componentWillUnmount(){
    this.mount = false;
  }
  seek = (startTime) => {
    this.state.lyric.seek(startTime * 1000);
  };
  // 歌词向上滚动控制
  handleLyric = ({ lineNum }) => {
    if (this.state.noLyric) {
      return;
    }
    if(this.mount){
      this.setState(() => ({
        currentLineNum: lineNum
      }));
      if (lineNum > 5) {
        const parentDom = document.querySelector('.lyric_container');
        const distance =
        parentDom.childNodes[lineNum].offsetTop -
        72 -
        (parentDom.childNodes[5].offsetTop - 72);
        this.refs.lyricList.scrollTo(0, distance);
      } else {
        this.refs.lyricList.scrollTo(0, 0);
      }
    }
  };
  render() {
    return(
      <ul className="lyric_container" ref="lyricList">
          {
            this.state.lyric ?
            this.state.lyric.lines.map((item, index) => {
              return (
                <li
                  key={index}
                  className={[
                    this.state.currentLineNum === index ? 'highlight' : '',
                    'lyric-list'
                  ].join(' ')}
                >
                  {item.txt}
                </li>
              );
            }): null
          }
      </ul>
    )
  }
}
const mapStateToProps = (action) => {
  return {
    currentMusicLyric: action.reducer.currentMusicLyric,
  }
}

const mapDispatchToProps = (value) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps, null,
  { forwardRef: true })(MusicLyric)
