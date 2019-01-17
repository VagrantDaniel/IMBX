import axios from 'axios';
import { HOST } from '../common/js/config.js';

//登录
export function login (type, userName, password) {
  let url = '';
  if(type === 0){
    url =  HOST +　`login/cellphone?phone=${userName}&password=${password}`;
  }else{
    url = HOST +　`login?email=${userName}&password=${password}`;
  }
  return axios.get(url);
}

// 获取登陆状态
export function getLoginStatus () {
  const url = HOST + 'login/status';
  return axios.get(url);
}

//获取用户详细信息
export function getUserDetail (id) {
  let url = HOST + `user/detail?uid=${id}`;
  return axios.get(url)
}

//获取用户歌单，收藏，mv、dj数量
export function getUserSubcount () {
  let url = HOST + `login/status`;
  return axios.get(url)
  // let url = JSON.stringify(HOST + 'user/subcount');
  // return instance({
  //   method: 'get',
  //   url: 'user/subcount',
  //   xhrFields: {
  //     withCredentials: true
  //   },
  // });
}

// 获得每日推荐歌单
export function getRecommendResource () {
  axios.defaults.baseURL = HOST;
  let url = `recommend/resource`;
  return axios.get(url)
  // let url = HOST + 'recommend/resource';
  // return axios({
  //   method: 'get',
  //   url: url,
  //   xhrFields: {
  //     withCredentials: true
  //   },
  // });
}

// 获得每日推荐歌曲
export function getRecommendSongs () {
  axios.defaults.baseURL = HOST;
  let url = `recommend/songs`;
  return axios.get(url)
}
