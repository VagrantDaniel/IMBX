import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './singleMusic.scss';

class SingleMusic extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <li className="singleMusic" data-key={this.props.dataKey} onClick={ this.props.changeCurrentMusic }>
        <img src={this.props.info.album.picUrl ? this.props.info.album.picUrl : null} alt="" />
        <div className="singleMusic_trumpet iconfont" style={{'display':
        this.props.info.id === this.props.musicList[this.props.currentIndex] ? 'block' :　'none'}}>&#xe60c;</div>
        <div className="singleMusic_info">
          <div className="music_name">{this.props.info.name ? this.props.info.name : null}
            <span className="music_alias">{this.props.info.alias[0] ? '('+this.props.info.alias[0] + ')': null}</span>
          </div>
          <div className="music_author">{this.props.info.artists[0].name ? this.props.info.artists[0].name : null}
          <span className="line">-</span>
          {this.props.info.album.name ? this.props.info.album.name : null}</div>
        </div>
        <div className="singleMusic_video iconfont">&#xe61e;</div>
        <div className="singleMusic_more iconfont" onClick={this.props.readMore}>&#xe610;</div>
      </li>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    musicList: state.reducer.musicList,
    currentIndex: state.reducer.currentIndex,
    // recommendSongsList: state.reducer.recommendSongsList,
    // recommendSongIndex: state.reducer.recommendSongIndex,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SingleMusic);
