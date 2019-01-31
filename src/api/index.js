import axios from 'axios';
import { HOST } from '../common/js/config.js';

//登录
export function login (type, userName, password) {
  axios.defaults.baseURL = HOST;
  let url = '';
  if(type === 0){
    url = `login/cellphone?phone=${userName}&password=${password}`;
  }else{
    url = `login?email=${userName}&password=${password}`;
  }
  console.log(axios.defaults.baseURL, axios)
  return axios.get(url);
}

// 获取登陆状态
export function getLoginStatus () {
  axios.defaults.baseURL = HOST;
  let url = `login/status`;
  // return axios.get(url);
  return axios({
    method: 'get',
    url: url,
    xhrFields: {
      withCredentials: true
    },
  });
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
  // return axios.get(url)
  // let url = HOST + 'recommend/resource';
  return axios({
    method: 'get',
    url: url,
    xhrFields: {
      withCredentials: true
    },
  });
}

// 获取歌单详情
export function getPlayListDetail (id) {
  axios.defaults.baseURL = HOST;
  let url = `playlist/detail?id=${id}`;
  return axios.get(url);
}

// 获得每日推荐歌曲
export function getRecommendSongs () {
  axios.defaults.baseURL = HOST;
  let url = `recommend/songs`;
  return axios.get(url)
}

//获取音乐 Url
export function getMusicUrl (id) {
  axios.defaults.baseURL = HOST;
  let url = `/song/url?id=${id}`;
  return axios.get(url);
}

// 获取音乐歌词
export function getMusicLyric (id) {
  axios.defaults.baseURL = HOST;
  let url = `/lyric?id=${id}`;
  return axios.get(url);
}
