import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './songSheet.scss';

class SongSheet extends Component{
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps){

  }
  render(){
    return(
      <div className="songSheet">
        <div className="header">推荐歌单</div>
        <ul className="songSheetList">
          <li><img src={this.state.songSheetList.} alt="" />
            <h6 className="playedAmount"><i className="iconfont"></i>{this.state.songSheetList.}</div>
            <h3 className="name">{this.state.songSheetList.}</h3>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SongSheet);
