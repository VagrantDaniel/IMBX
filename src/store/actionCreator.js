import * as types from './actionTypes';

// 判断账号类型：邮箱 or 手机号
export const getLoginType = (value) => ({
  type: types.Login_Type,
  value
})

// 登录账号
export const rememberAccount = (value) => ({
  type: types.Remember_Account,
  value
})

// 获得每日推荐歌单
export const getRecommendResource = (value) => ({
  type: types.Recommend_Resource,
  value
})

// 记住当前播放音乐index
// 更新当前播放音乐Index
export const getRecommendSongIndex = (value) => ({
  type: types.Current_Music,
  value
})

// 获取音乐url
export const getSongUrl = (value) => ({
  type: types.Song_Url,
  value
})

//获取音乐audio
export const getAudio = (value) => ({
  type: types.Song_Audio,
  value
})

//更新每日推荐歌曲列表
export const updateRecommendSongList = (value) => ({
  type: types.Update_Recomend,
  value
})
