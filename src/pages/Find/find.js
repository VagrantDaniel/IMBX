import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRecommendSongs } from '../../store/actionCreator';
import { Tabs } from 'antd';
import SongSheet from '../../component/SongSheet/songSheet';
import './find.scss';

class Find extends Component{
  constructor(props) {
    super(props);
    this.changeTabs = this.changeTabs.bind(this);
    this.getRecommendSongs = this.getRecommendSongs.bind(this);
  }
  changeTabs(key){
    // console.log('key', key);
  }
  getRecommendSongs(){
    this.props.getRecommendSongs('每日推荐');
  }
  // componentWillReceiveProps(nextProps){
  //   if(!nextProps.currentMusic){
  //     return;
  //   }
  //   // 当上一个props 的歌词和 这个 props 的歌词一样时，直接返回
  //    const r =
  //      JSON.stringify(nextProps.currentMusic) ===
  //      JSON.stringify(this.props.currentMusic);
  //    if (r) {
  //      return;
  //    }
  //    this.setState({
  //      recommendName: this.props.recommendName,
  //      recommendSongSheetList: this.props.recommendSongSheetList,
  //    });
  //    console.log(this.state, this.props)
  // }
  render(){
    const { recommend } = this.state.recommendSongSheetList;
    const TabPane = Tabs.TabPane;
    return(
      <div className="find">
        <div className="findTabs">
          <Tabs defaultActiveKey="1" animated={false} onChange={this.changeTabs}>
           <TabPane tab="个性推荐" key="1">
              <ul className="mainList">
                <NavLink
                  exact
                  to='/mrtj'>
                <li onClick={this.getRecommendSongs}>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe60c;</i>
                  </div>
                  <h3 className="tag_name">私人FM</h3>
                </li>
                </NavLink>
                <NavLink
                  exact
                  to='/mrtj'>
                <li onClick={this.getRecommendSongs}>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe6b0;</i>
                  </div>
                  <h3 className="tag_name">每日推荐</h3>
                </li>
                </NavLink>
                <NavLink
                  exact
                  to='/mrtj'>
                <li onClick={this.getRecommendSongs}>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe601;</i>
                  </div>
                  <h3 className="tag_name">歌单</h3>
                </li>
                </NavLink>
                <NavLink
                  exact
                  to='/mrtj'>
                <li onClick={this.getRecommendSongs}>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe60f;</i>
                  </div>
                  <h3 className="tag_name">排行榜</h3>
                </li>
                </NavLink>
              </ul>
              <SongSheet songSheetList={ recommend }></SongSheet>
           </TabPane>
           <TabPane tab="主播电台" key="2"></TabPane>
         </Tabs>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    recommendName: state.reducer.recommend.name,
    recommendSongSheetList: state.reducer.recommend.songSheetList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    getRecommendSongs(value){
      dispatch(getRecommendSongs(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Find);
