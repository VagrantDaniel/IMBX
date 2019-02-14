import * as types from './actionTypes';
import {　login, getUserDetail, getUserSubcount, getLoginStatus, getRecommendResource, getRecommendSongs,
getSongUrl, updateRecommendSongList, updatePlayNext, getPlayListDetail } from '../api';
import { PLAY_MODE_TYPES } from '../common/js/config';
const DEFAULT_VOLUME = 0.5;
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
  profile: null,
  // profile:{
  //   userId: null,
  //   nickname: null,
  //   avatarUrl: null,
  //   level: null, // 我的等级
  //
  // },
  recommend: {
    name: '推荐歌单',
    songSheetList: null,
    playlist: null,
  },
  // 推荐音乐歌单列表
  RecommendResourceList: null,
  // 推荐音乐歌曲列表
  recommendSongsList: null,
  // 推荐音乐列表选中index
  recommendSongIndex: null,
  // 音乐url
  // songUrl: null,
  // 音乐歌词
  // currentMusicLyric: null,
  // 播放模式
  // 0 单曲循环,1 列表循环,2 随机播放
  // playType: 0,
  // 音乐audio
  // audio: null,
  // played: null,
  // buffered: null,
  // 当前播放音乐
  // currentMusic: null,

  //////////////////
  // 选择类型对应名字
  headerName: null,
  // 音乐列表
  musicList: null,
  // 播放状态
  playing: false,
  // 播放音乐
  currentMusic: null,
  // 当前播放索引
  currentIndex: 0,
  // 播放音乐歌词
  currentMusicLyric: null,
  // 播放列表
  playList: [],
  // 播放模式
  playMode: PLAY_MODE_TYPES.SEQUENCE_PLAY,
  // 音量
  volume: DEFAULT_VOLUME,
}
export const reducer = (state = defaultState, action) => {
  let newState;
  switch(action.type){
    // 判断账号类型：邮箱 or 手机号
    case types.Login_Type:
      newState = deepClone(state);
      if(action.value !== null){
        newState.account.loginType = action.value;
      }
      return newState;
    // 登录账号
    case types.Remember_Account:
      newState = deepClone(state);
      if(action.value !== null){
        // newState.account.userName = action.value.userName;
        // newState.account.password = action.value.password;
        newState.profile = action.value;
        newState.account.isLogin = true;
      }
      return newState;
    // 获得每日推荐歌曲
    case types.Recommend_Songs:
      newState = deepClone(state);
      getRecommendSongs().then(({ data }) => {
        newState.headerName = action.value;
        // newState.recommendSongsList = data.recommend;
        newState.musicList = data.recommend;
        newState.playList = data.recommend;
      }).catch((e) => {
        console.log('获得每日推荐歌曲失败', e)
      })
      return newState;
    // 获得每日推荐歌单
    case types.Recommend_Resource:
        newState = deepClone(state);
        getRecommendResource().then(( {data} ) => {
          newState.recommend.songSheetList = data.recommend;
        }).catch((e) => {
          console.log('获得每日推荐歌单失败', e)
        })
        return newState;
    // 获取歌单详情
    case types.Playlist_Detail:
        newState = deepClone(state);
        getPlayListDetail(action.value).then(( {data} ) => {
          console.log(data)
          newState.recommend.playlist = data.playlist;
        }).catch((e) => {
          console.log('获取歌单详情失败', e)
        })
        return newState;
    // 更新每日推荐歌单
    case types.Update_Recomend:
      newState = deepClone(state);
      if(action.value != null){
        newState.recommendSongsList = action.value;
      }
      return newState;
    // 每日推荐列表中选中的当前音乐
    case types.Current_Music:
      newState = deepClone(state);
      if(action.value != null){
        // newState.recommendSongIndex = action.value;
        newState.currentIndex = action.value;
      }else{
        console.log('获取每日推荐列表中选中的当前音乐失败');
        return;
      }
      return newState;
    case types.CHANGE_VOLUME:
      newState = deepClone(state);
      if(action.value != null){
        newState.recommendSongsList = action.value;
      }
      return newState;
    // 获取音乐url
    // case types.Song_Url:
    //   newState = deepClone(state);
    //   getSongUrl(action.value).then(({data}) => {
    //     newState.songUrl = data.data[0].url;
    //   }).catch((e) => {
    //     console.log('获取音乐url失败');
    //   })
    //   return newState;
    // 获取音乐audio
    // case types.Song_Audio:
    //   newState = deepClone(state);
    //   if(action.value != null){
    //     newState.audio = action.value.audio;
    //     newState.played = action.value.played;
    //     newState.buffered = action.value.buffered;
    //   }else{
    //     console.log('获取音乐audio失败');
    //   }
    //   return newState;
    // case types.Update_Current_Music_Lyric:
    //   newState = deepClone(state);
    //   if(action.value != null){
    //     newState.currentMusicLyric = action.value;
    //   }else{
    //     console.log('获取、更新当前播放音乐歌词失败');
    //   }
    //   return newState;
    // 更新播放模式
    // case types.Update_PlayNext:
    //   newState = deepClone(state);
    //   if(action.value != null){
    //     newState.playType = action.value;
    //   }else{
    //     console.log('更新播放模式失败');
    //   }
    //   return newState;
    // 改变音乐播放状态
    case types.CHANGE_PLAYING_STATUS:
      newState = deepClone(state);
      newState.playing = action.value;
      return newState;
    // 改变音乐播放模式
    case types.CHANGE_PLAY_MODE:
      newState = deepClone(state);
      if(action.value){
        newState.playMode = action.value;
      }
      return newState;
    // 改变当前播放音乐歌词
    case types.CHANGE_CURRENT_MUSIC_LYRIC:
      newState = deepClone(state);
      if(action.value){
        newState.currentMusicLyric = action.value;
      }
      return newState;
    // 改变当前播放列表
    case types.CHANGE_PLAY_LIST:
      newState = deepClone(state);
      if(action.value){
        newState.playList = action.value;
      }
      return newState;
    // 改变当前播放音乐信息
    case types.CHANGE_CURRENT_MUSIC:
      newState = deepClone(state);
      newState.currentMusic = action.value;
      newState.playing = true;
      return newState;
    // 改变当前播放音乐索引
    case types.CHANGE_CURRENT_INDEX:
      newState = deepClone(state);
      if(action.value != null){
        newState.currentIndex = action.value;
      }
      return newState;
    default:
      return state;
  }
}


function deepClone (val) {
  return  JSON.parse(JSON.stringify(val));
}
