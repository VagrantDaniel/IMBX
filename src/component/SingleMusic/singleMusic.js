import React, { Component } from 'react';
import './singleMusic.scss';

export default class SingleMusic extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="singleMusic">
        <img src="" alt="" />
        <div className="singleMusic_info">
          <div className="music_name"></div>
          <div className="music_author"></div>
        </div>
        <div className="singleMusic_video"></div>
        <div className="singleMusic_more"></div>
      </div>
    )
  }
}
