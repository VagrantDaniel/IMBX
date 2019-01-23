import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getChangeCurrentMusic } from '../../store/actionCreator';
import SingleMusic from '../../component/SingleMusic/singleMusic';
import DrawerBox from '../../component/DrawerBox/drawBox';
// import { getRecommendResource } from '../../store/actionCreator';
import './mrtj.scss';

// 每日推荐歌单
class Mrtj extends Component {
  constructor(props) {
    super(props);
    this.moreDetails = this.moreDetails.bind(this);
    this.changeCurrentMusic = this.changeCurrentMusic.bind(this);
  }
  componentDidMount () {
  }
  changeCurrentMusic (e){
    let index = e.currentTarget.getAttribute('data-key');
    this.props.getChangeCurrentMusic(this.props.musicList[index]);
    this.props.history.push('/playDetails');
  }
  moreDetails (e) {
    e.preventDefault();
    e.stopPropagation();
    var index = e.target.parentNode.getAttribute('data-key');
    // 歌曲名、歌手、所属专辑、评论
    this.refs.drawBox.showDrawer(this.props.recommendSongsList[index].name,
    this.props.musicList[index].artists[0].name,
    this.props.musicList[index].album.name
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
            this.props.musicList ?
            this.props.musicList.map((item, key) => {
              return(
                <SingleMusic info={item} key={item.id} dataKey={key} changeCurrentMusic={ this.changeCurrentMusic } readMore={this.moreDetails}/>
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
    musicList: state.reducer.musicList,
    currentIndex: state.reducer.currentIndex,
    // recommendSongsList: state.reducer.recommendSongsList,
    // recommendSongIndex: state.reducer.recommendSongIndex,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getChangeCurrentMusic(value){
      dispatch(getChangeCurrentMusic(value));
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Mrtj));
