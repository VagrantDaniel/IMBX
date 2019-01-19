import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecommendSongIndex } from '../../store/actionCreator';
import SingleMusic from '../../component/SingleMusic/singleMusic';
import DrawerBox from '../../component/DrawerBox/drawBox';
// import { getRecommendResource } from '../../store/actionCreator';
import './mrtj.scss';

// 每日推荐歌单
class Mrtj extends Component {
  constructor(props) {
    super(props);
    this.moreDetails = this.moreDetails.bind(this);
    this.getSongIndex = this.getSongIndex.bind(this);
  }
  componentDidMount () {
  }
  getSongIndex (e){
    let index = e.currentTarget.getAttribute('data-key');
    this.props.getRecommendSongIndex(index);
  }
  moreDetails (e) {
    e.preventDefault();
    e.stopPropagation();
    var index = e.target.parentNode.getAttribute('data-key');
    // 歌曲名、歌手、所属专辑、评论
    this.refs.drawBox.showDrawer(this.props.recommendSongsList[index].name,
    this.props.recommendSongsList[index].artists[0].name,
    this.props.recommendSongsList[index].album.name
  );
  }
  render() {
    return(
      <div className="mrtj">
        <div className="header">
          <Link to="/find">
            <i className="iconfont icon">&#xe611;</i>
          </Link>
          <div className="header-name">{this.props.headerName}</div>
        </div>
        <ul className="musicList">
          {
            this.props.recommendSongsList ?
            this.props.recommendSongsList.map((item, key) => {
              return(
                <SingleMusic info={item} key={item.id} dataKey={key}　getSongIndex={ this.getSongIndex } readMore={this.moreDetails}/>
              )
            }) : null
          }
        </ul>
        <DrawerBox ref="drawBox"></DrawerBox>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    headerName: state.reducer.headerName,
    recommendSongsList: state.reducer.recommendSongsList,
    recommendSongIndex: state.reducer.recommendSongIndex,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRecommendSongIndex(value){
      dispatch(getRecommendSongIndex(value));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mrtj);
