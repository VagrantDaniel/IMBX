import * as types from './actionTypes';
import {　login, getUserDetail, getUserSubcount, getLoginStatus, getRecommendResource, getRecommendSongs } from '../api';

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
  // 推荐音乐歌单列表
  RecommendResourceList: null,
  // 推荐音乐歌曲列表
  recommendSongsList: null,
}
export const reducer = (state = defaultState, action) => {
  let newState;
  switch(action.type){
    // 判断账号类型：邮箱 or 手机号
    case types.Login_Type:
      newState = deepClone(state);
      console.log('action',action)
      if(action.value !== null){
        newState.account.loginType = action.value;
      }
      return newState;
    // 登录账号
    case types.Remember_Account:
      newState = deepClone(state);
      if(action.value !== null){
        newState.account.userName = action.value.userName;
        newState.account.password = action.value.password;
        login(newState.account.loginType, newState.account.userName, newState.account.password).then(
          ({data}) => {
            getLoginStatus().then(({data}) => {
              if(data.code === 200){
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
    case types.Remember_Account:
      newState = deepClone(state);
      if(action.value !== null){
        newState.account.userName = action.value.userName;
        newState.account.password = action.value.password;
        login(newState.account.loginType, newState.account.userName, newState.account.password).then(
          ({data}) => {
            getLoginStatus().then(({data}) => {
              if(data.code === 200){
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
    // 获得每日推荐歌单
    case types.Recommend_Resource:
      newState = deepClone(state);
      getRecommendSongs().then(({ data }) => {
        newState.headerName = action.value;
        console.log('123', data.recommend)
        newState.recommendSongsList = data.recommend;
      }).catch((e) => {
        console.log('获得每日推荐歌曲失败', e)
      })
      return newState;
    default:
      return state;
  }
}


function deepClone (val) {
  return  JSON.parse(JSON.stringify(val));
}
