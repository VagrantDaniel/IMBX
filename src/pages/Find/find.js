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
    this.state = {
      recommendName: null,
      recommendSongSheetList: {
    code:200,
    featureFirst:true,
    haveRcmdSongs:false,
    recommend:[
        {
            "id":2578068117,
            "type":1,
            "name":"2018年度最热新歌TOP100",
            "copywriter":"根据你喜欢的单曲《给陌生的你听 》推荐",
            "picUrl":"https://p1.music.126.net/6Dnpnv9pi30ix2LuoNU1IQ==/109951163755515426.jpg",
            "playcount":42733472,
            "createTime":1546078909526,
            "creator":{
                "avatarImgIdStr":1420569024374784,
                "avatarImgId":1420569024374784,
                "backgroundImgId":2002210674180202,
                "detailDescription":"网易云音乐官方账号",
                "avatarUrl":"https://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg",
                "authStatus":1,
                "userType":2,
                "vipType":11,
                "province":110000,
                "gender":1,
                "nickname":"网易云音乐",
                "description":"网易云音乐官方账号",
                "defaultAvatar":false,
                "expertTags":null,
                "djStatus":10,
                "mutual":false,
                "remarkName":null,
                "backgroundUrl":"http://p1.music.126.net/pmHS4fcQtcNEGewNb5HRhg==/2002210674180202.jpg",
                "backgroundImgIdStr":2002210674180202,
                "birthday":-2209017600000,
                "city":110101,
                "followed":false,
                "accountStatus":0,
                "userId":1,
                "signature":"网易云音乐是6亿人都在使用的音乐平台，致力于帮助用户发现音乐惊喜，帮助音乐人实现梦想。客服在线时间：9：00 - 24：00，如您在使用过程中遇到任何问题，欢迎私信咨询@云音乐客服 ，我们会尽快回复。如果仍然不能解决您的问题，请邮件我们：用户：ncm5990@163.com音乐人：yyr599@163.com",
                "authority":3
            },
            "trackCount":100,
            "userId":1,
            "alg":"qrt_itembased1"
        },
        {
            "id":2438292020,
            "type":1,
            "name":"听说你也在找好听的华语歌",
            "copywriter":"根据你喜欢的单曲《给陌生的你听 》推荐",
            "picUrl":"https://p1.music.126.net/Fs0DjAvcAAyAZa1dgXzFfQ==/109951163571833739.jpg",
            "playcount":47383260,
            "createTime":1537977067262,
            "creator":{
                "avatarImgIdStr":"109951163409236269",
                "avatarImgId":109951163409236270,
                "backgroundImgId":18913799021553784,
                "detailDescription":"",
                "avatarUrl":"https://p1.music.126.net/j2tHprJZi2zGfX5jBCuvwA==/109951163409236269.jpg",
                "authStatus":0,
                "userType":200,
                "vipType":0,
                "province":110000,
                "gender":1,
                "nickname":"鹿白川",
                "description":"",
                "defaultAvatar":false,
                "expertTags":[
                    "华语",
                    "流行",
                    "欧美"
                ],
                "djStatus":0,
                "mutual":false,
                "remarkName":null,
                "backgroundUrl":"http://p1.music.126.net/TUoyq4dzypO4qCnFwh1TYw==/18913799021553784.jpg",
                "backgroundImgIdStr":18913799021553784,
                "birthday":756694371293,
                "city":110101,
                "followed":false,
                "accountStatus":0,
                "userId":493707309,
                "signature":"话少慢热不喜交际 / 不推广 勿扰",
                "authority":0
            },
            "trackCount":110,
            "userId":493707309,
            "alg":"qrt_itembased1"
        },
        {
            "id":2065639760,
            "type":1,
            "name":"这些歌比《说散就散》《体面》更扎心！",
            "copywriter":"根据你喜欢的单曲《你要的全拿走》推荐",
            "picUrl":"https://p1.music.126.net/26LPymJM-Jff9K9UVXhxSQ==/18996262393662264.jpg",
            "playcount":11191328,
            "createTime":1516395807545,
            "creator":{
                "avatarImgIdStr":1388683202205889,
                "avatarImgId":1388683202205889,
                "backgroundImgId":109951163656065200,
                "detailDescription":"",
                "avatarUrl":"https://p1.music.126.net/lOzGcaot9hj41HJtDDvG9A==/1388683202205889.jpg",
                "authStatus":0,
                "userType":0,
                "vipType":0,
                "province":440000,
                "gender":1,
                "nickname":"黄颂龙",
                "description":"",
                "defaultAvatar":false,
                "expertTags":null,
                "djStatus":0,
                "mutual":false,
                "remarkName":null,
                "backgroundUrl":"http://p1.music.126.net/dzpvUtARgodYjYuoHIu1oQ==/109951163656065206.jpg",
                "backgroundImgIdStr":"109951163656065206",
                "birthday":707082571198,
                "city":440300,
                "followed":false,
                "accountStatus":0,
                "userId":344688181,
                "signature":"",
                "authority":0
            },
            "trackCount":105,
            "userId":344688181,
            "alg":"contextbased"
        },
        {
            "id":956153692,
            "type":1,
            "name":"以 丧 治 丧",
            "copywriter":"根据你喜欢的单曲《你要的全拿走》推荐",
            "picUrl":"https://p1.music.126.net/yCV-t0YV1hDoQmn5Fv5Elg==/109951163354241804.jpg",
            "playcount":9431512,
            "createTime":1507873838652,
            "creator":{
                "avatarImgIdStr":"109951163682947329",
                "avatarImgId":109951163682947330,
                "backgroundImgId":109951163821335570,
                "detailDescription":"",
                "avatarUrl":"https://p1.music.126.net/p5gbvbCDJKKOZ2GzEmpK2Q==/109951163682947329.jpg",
                "authStatus":0,
                "userType":0,
                "vipType":0,
                "province":320000,
                "gender":1,
                "nickname":"小耀AAA",
                "description":"",
                "defaultAvatar":false,
                "expertTags":null,
                "djStatus":0,
                "mutual":false,
                "remarkName":null,
                "backgroundUrl":"http://p1.music.126.net/shGRewRejxM6_7j01O5LCg==/109951163821335575.jpg",
                "backgroundImgIdStr":"109951163821335575",
                "birthday":975686400000,
                "city":321200,
                "followed":false,
                "accountStatus":0,
                "userId":336944257,
                "signature":"",
                "authority":0
            },
            "trackCount":268,
            "userId":336944257,
            "alg":"contextbased"
        },]},
    }
    this.changeTabs = this.changeTabs.bind(this);
  }
  changeTabs(key){
    // console.log('key', key);
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
                  to='/mrtj'
                  >
                <li onClick={this.props.getRecommendSongs('每日推荐')}>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe60c;</i>
                  </div>
                  <h3 className="tag_name">私人FM</h3>
                </li>
                </NavLink>
                <NavLink
                  exact
                  to='/mrtj'
                  onClick={this.props.handleSrFM}>
                <li onClick={this.props.getRecommendSongs('每日推荐')}>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe6b0;</i>
                  </div>
                  <h3 className="tag_name">每日推荐</h3>
                </li>
                </NavLink>
                <NavLink
                  exact
                  to='/mrtj'
                  onClick={this.props.handleSrFM}>
                <li onClick={this.props.getRecommendSongs('每日推荐')}>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe601;</i>
                  </div>
                  <h3 className="tag_name">歌单</h3>
                </li>
                </NavLink>
                <NavLink
                  exact
                  to='/mrtj'
                  onClick={this.props.handleSrFM}>
                <li onClick={this.props.getRecommendSongs('每日推荐')}>
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
