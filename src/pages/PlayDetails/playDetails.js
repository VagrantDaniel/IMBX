/**
* 播放详情页
**/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecommendSongIndex, updateRecommendSongList, getChangePlayListAction} from '../../store/actionCreator';
import { Link } from 'react-router-dom';
import { getMusicUrl, getMusicLyric} from '../../api';
import Player from '../../component/Player/player';
import axios from 'axios';
import './playDetails.scss';

class PlayDetails extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount(){

  }
  render(){
    return(
      <div className="playDetails">
        {/*导航*/}
        <div className="header">
          <Link to="/mrtj">
            <i className="iconfont icon" onClick={this.stopM}>&#xe611;</i>
          </Link>
          <div className="header_name">
            <div className="music_name">{this.props.currentMusic.name ?　this.props.currentMusic.name : null}</div>
            <div className="music_author">{this.props.currentMusic.artists ?
              this.props.currentMusic.artists.map((item) => {
                return item.name
              }) : null
            }</div>
          </div>
        </div>
        {/*音乐盒组装*/}
        <div className="music_box">
          {/*歌词*/}
          {/*功能列表*/}
          {/*播放器*/}
          <Player ref="player" currentMusicSrc={ this.props.currentMusic.musicUrl }></Player>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return{
    currentMusic: state.reducer.currentMusic,
    currentMusicLyric: state.reducer.currentMusicLyric,
    // recommendSongsList: state.reducer.recommendSongsList,
    // recommendSongIndex: state.reducer.recommendSongIndex,
    // audio: state.reducer.audio,
    // played: state.reducer.played,
    // buffered: state.reducer.buffered,
    // playType: state.reducer.playType,
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    updateRecommendSongIndex(value){
      dispatch(getRecommendSongIndex(value));
    },
    // getAudio(value){
    //   dispatch(getAudio(value));
    // },
    updateRecommendSongList(value){
      dispatch(updateRecommendSongList(value));
    },
    getChangePlayListAction(value){
      dispatch(getChangePlayListAction(value));
    },
    // updatePlayNext(value){
    //   dispatch(updatePlayNext(value));
    // },
    // updateCurrentMusicLyric(value){
    //   dispatch(updateCurrentMusicLyric(value));
    // }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayDetails);
