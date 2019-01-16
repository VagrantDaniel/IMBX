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
