import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import singleMusic from '../../component/SingleMusic/singleMusic';
// import { getRecommendResource } from '../../store/actionCreator';
import './mrtj.scss';

class Mrtj extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {

  }
  render() {
    return(
      <div className="mrtj">
        <div className="header">
          <Link to="/search">
            <i className="iconfont icon">&#xe611;</i>
          </Link>
          <div className="header-name">{this.props.headerName}</div>
        </div>
        <ul className="musicList">
          {
            this.props.musicList ?
            this.props.musicList.map((item, key) => {
              return(
                <singleMusic info="item" />
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
    headerName: state.headerName,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mrtj);
