import * as types from './actionTypes';
import {　login, getUserDetail, getUserSubcount, getRecommendResource, getLoginStatus } from '../api';

const defaultState = {
  account: {
    // 登录类型：0 手机号，1 邮箱
    loginType: null,
    // 是否登录
    isLogin: false,
    userName: null,
    password: null,
  },
  // 用户简介
  profile:{
    userId: null,
    nickname: null,
    avatarUrl: null,
    level: null, // 我的等级

  },
  // 选择类型对应名字
  headerName: null,
  // 音乐列表
  musicList: null,

}
export default (state = defaultState, action) => {
  // 判断账号类型：邮箱 or 手机号
  if(action.type === types.Login_Type){
    const newState = deepClone(state);
    console.log('action',action)
    if(action.value !== null){
      newState.account.loginType = action.value;
    }
    return newState;
  }
  // 登录账号
  if(action.type === types.Remember_Account){
    const newState = deepClone(state);
    if(action.value !== null){
      newState.account.userName = action.value.userName;
      newState.account.password = action.value.password;
      login(newState.account.loginType, newState.account.userName, newState.account.password).then(
        ({data}) => {
          getLoginStatus().then(({data}) => {
            if(data.code === 200)
              getUserSubcount().then(({data}) => {
                console.log('data', data);
              }).catch((e) => {
                console.log('获取用户歌单等信息失败', e);
              });
            }else{
              console.log('data',data.code);
            }
          }).catch((e) => {
            console.log('获取登陆状态失败', e)
          })
          // getUserSubcount().then(({data}) => {
          //   console.log('data', data);
          // }).catch((e) => {
          //   console.log('获取用户歌单等信息失败', e);
          // });
          // getUserDetail(data.account.id).then(({data}) => {
          //   // new
          //   console.log('details', data)
          // }).catch((e) => {
          //   console.log('获取用户详细信息失败', e);
          // });
        }).catch((e) => {
        console.log('登录失败了', e)
      });

    }
    return newState;
  }
  // 获得每日推荐歌单
  if(action.type === types.Recommend_Resource){
    const newState = deepClone(state);
    getRecommendResource().then(({ data }) => {
      console.log('data',data)
      newState.headerName = '每日推荐';
    }).catch((e) => {
      console.log('获得每日推荐歌单失败', e)
    })
    return newState;
  }
}


function deepClone (val) {
  return  JSON.parse(JSON.stringify(val));
}
