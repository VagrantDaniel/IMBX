import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getChangeCurrentMusic, getChangePlayListAction } from '../../store/actionCreator';
import SingleMusic from '../../component/SingleMusic/singleMusic';
import DrawerBox from '../../component/DrawerBox/drawBox';
// import { getRecommendResource } from '../../store/actionCreator';
import './mrtj.scss';

// 每日推荐歌单
class Mrtj extends Component {
  constructor(props) {
    super(props);
    console.log('每日推荐', this.props)
    this.state = {
      headerName: '',
      musicList: '',
    }
    this.moreDetails = this.moreDetails.bind(this);
    this.changeCurrentMusic = this.changeCurrentMusic.bind(this);
  }
  componentDidMount(){
    console.log('didmount', this.props)
    if(this.props.musicList){
      this.setState(() => ({
        musicList: this.props.musicList,
      }));
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log('nextProps', nextProps)
    if(!nextProps.musicList){
      return;
    }
    // 当上一个props 的歌词和 这个 props 的歌词一样时，直接返回
     const r =
       JSON.stringify(nextProps.musicList) ===
       JSON.stringify(this.props.musicList);
     if (r) {
       return;
     }
     this.setState(() => ({
       musicList: nextProps.musicList,
     }));
    this.props.getChangePlayListAction(this.props.musicList);
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
    this.refs.drawBox.showDrawer(this.props.musicList[index].name,
    this.props.musicList[index].artists[0].name,
    this.props.musicList[index].album.name);
  }
  render() {
    return(
      <div className="mrtj">
        <div className="header">
          <Link to="/find">
            <i className="iconfont icon">&#xe611;</i>
          </Link>
          <div className="header-name">{this.state.headerName}</div>
        </div>
        <ul className="musicList">
          {
            this.state.musicList ?
            this.state.musicList.map((item, key) => {
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
  console.log('state', state)
  return {
    headerName: state.reducer.headerName,
    musicList: state.reducer.musicList,
    // recommendSongsList: state.reducer.recommendSongsList,
    // recommendSongIndex: state.reducer.recommendSongIndex,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getChangeCurrentMusic(value){
      dispatch(getChangeCurrentMusic(value));
    },
    getChangePlayListAction(value){
      dispatch(getChangePlayListAction(value));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mrtj);
