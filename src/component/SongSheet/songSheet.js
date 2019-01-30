import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { formatPlayCount } from '../../common/js/util';
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
        <div className="header">推荐歌单<i className="iconfont arrowR">&#xe61b;</i></div>
        <ul className="songSheetList">
          {
            this.props.songSheetList ?
            this.props.songSheetList.map((item, key) => {
              return (
                <li key={ item.id }>
                  <img src={ item.picUrl } alt="" />
                  <h6 className="playedAmount"><i className="iconfont earphone">&#xe61b;</i>{ formatPlayCount(item.playcount) }万</h6>
                  <h3 className="name">{ item.name }</h3>
                </li>
              )
            }) : null
          }
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
