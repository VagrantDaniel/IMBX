import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import singleMusic from '../../component/SingleMusic/singleMusic';
// import { getRecommendResource } from '../../store/actionCreator';
import './mrtj.scss';

class Mrtj extends Component {
  constructor(props) {
    super(props);
    console.log('props', props)
    this.state = {
      headerName: null,
      recommendSongsList: null,
    }
  }
  componentDidMount () {
    if(this.props.headerName != null){
      this.setState({
        headerName : this.props.headerName,
      })
    }
    if(this.props.recommendSongsList != null){
      this.setState({
        recommendSongsList: this.props.recommendSongsList,
      })
    }
  }
  render() {
    return(
      <div className="mrtj">
        <div className="header">
          <Link to="/search">
            <i className="iconfont icon">&#xe611;</i>
          </Link>
          <div className="header-name">{this.state.headerName}</div>
        </div>
        <ul className="musicList">
          {
            this.props.recommendSongsList ?
            this.props.recommendSongsList.map((item, key) => {
              return(
                <singleMusic info={item} key={item.id}/>
              )
            }) : null
          }
        </ul>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    headerName: state.headerName,
    recommendSongsList: state.recommendSongsList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mrtj);
