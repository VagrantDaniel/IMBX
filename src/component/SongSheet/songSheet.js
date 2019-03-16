import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { formatPlayCount } from '../../common/js/util';
import { getPlayListDetail } from '../../store/actionCreator';
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
        <div className="header">{ this.props.songSheetName }<i className="iconfont arrowR">&#xe652;</i></div>
        <ul className="songSheetList">
          {
            this.props.songSheetList ?
            this.props.songSheetList.map((item, key) => {
              return (
                <li key={ item.id } onClick={ () => this.props.getPlayListDetail(item.id) }>
                  <img src={ item.picUrl } alt="" />
                  <h6 className="playedAmount"><i className="iconfont earphone">&#xe60a;</i>{ formatPlayCount(item.playcount) }万</h6>
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
    getPlayListDetail(value) {
      dispatch(getPlayListDetail(value));
    }
  }
}
export default connect(null, mapDispatchToProps)(SongSheet);
