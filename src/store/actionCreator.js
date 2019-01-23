import * as types from './actionTypes';
import { getMusicLyric, getMusicUrl } from '../api';
import { findIndex } from '../common/js/util';
import { PLAY_MODE_TYPES } from '../common/js/config';
import { message } from 'antd';
import { push } from 'react-router-redux';
import history from 'history/createBrowserHistory';

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

// 改变音乐音量
export const getChangeVloumeAction = (value) => ({
	type: types.CHANGE_VOLUME,
	value
});
//
// // 获取音乐url
// export const getSongUrl = (value) => ({
// type: types.Song_Url,
// value
// })
//
// //获取音乐audio
// export const getAudio = (value) => ({
// type: types.Song_Audio,
// value
// })
//
// //更新每日推荐歌曲列表
export const updateRecommendSongList = (value) => ({
type: types.Update_Recomend,
value
})
//
// //更新播放模式
// export const updatePlayNext = (value) => ({
// type: types.Update_PlayNext,
// value
// })
//
// // 获取、更新当前播放音乐歌词
// export const updateCurrentMusicLyric = (value) => ({
// type: types.Update_Current_Music_Lyric,
// value
// })
//
// ///////////////////////////////////

// 改变音乐播放状态
export const getChangePlayingStatusAction = (status) => ({
type: types.CHANGE_PLAYING_STATUS,
status
});

// 改变音乐播放模式
export const getChangePlayModeAction = (value) => ({
  type: types.CHANGE_PLAY_MODE,
  value
});

//改变当前播放列表
export const getChangePlayListAction = (value) => ({
	type: types.CHANGE_PLAY_LIST,
	value
});

//		改变当前播放索引 currentIndex
export const getChangeCurrentIndex = (value) => ({
	type: types.CHANGE_CURRENT_INDEX,
	value
});

//		改变当前播放歌曲信息
export const changeCurrentMusicAction = (value) => ({
	type: types.CHANGE_CURRENT_MUSIC,
	value
});

//		改变当前播放音乐歌词
export const changeCurrentMusicLyric = (value) => ({
	type: types.CHANGE_CURRENT_MUSIC_LYRIC,
	value
});

//		改变音量
export const getChangeVolumeAction = (value) => ({
	type: types.CHANGE_VOLUME,
	value
});

//		获取当前播放音乐歌词
function getCurrentMusicLyric(){
	return (dispatch,getState) => {
		const state = getState();
		let currentMusicId = state.reducer.currentMusic.id;
//				清空之前的歌词
		dispatch(changeCurrentMusicLyric(null));

//				获取新的歌词
		getMusicLyric(currentMusicId).then(({ data }) => {
			if(data.code === 200){
				dispatch(changeCurrentMusicLyric(data));
			}else{
				console.log('获取新的歌词失败')
			}
		}).catch((e) => {
			console.log('获取新的歌词失败',e);
		});
	}
}

//		获取随机值
function random (index, length){
	const res = Math.floor(Math.random() * length);
	if(res === index){
		return random(index, length);
	}
	return res;
}

//		点击歌曲播放逻辑控制
export const getChangeCurrentMusic = (value, loadCacheMusic = false) => {
	return (dispatch, getState) => {
		const state = getState();
		const list  = state.reducer.musicList;
//				从歌曲列表中寻找当前歌曲的index
		const index = findIndex(list, value);
		if ( index === state.reducer.currentIndex && !loadCacheMusic){
			return;
		}
		if(index >= 0){
			dispatch(getChangeCurrentIndex(index));
		}else{
//					如果没有这首歌
//push 这首歌到playList中
//改变index
			list.push(value);
			dispatch(getChangePlayListAction(list));
			dispatch(getChangeCurrentIndex(list.length - 1));
		}
//				改变当前播放音乐信息
		// dispatch(changeCurrentMusicAction(value));
		// console.log('123')
//				获取歌曲url
		getMusicUrl(value.id).then(({data: { data }}) => {
			if(!data[0].url){
				message.info('歌曲暂无版权，自动播放下一首歌曲');
				if(index !== list.length - 1){
					dispatch(playNextMusicAction());
				}
				return;
			}
			value.musicUrl = data[0].url;
			dispatch(changeCurrentMusicAction(value));
			if(loadCacheMusic){
				let STOP = false;
				dispatch(getChangePlayingStatusAction(STOP));
			}

		}).then(() => {
			//				获取当前播放音乐歌词
					dispatch(getCurrentMusicLyric());
		})
	}
}

//		播放上一首
export const playPrevMusicAction = () => {
	return (dispatch, getState) => {
		const state = getState();
		const { musicList } = state.reducer;
		let { currentIndex } = state.reducer;
		const len = musicList.length;
		if(len === 0 || len === 1){
			return;
		}
//				随机播放
		if(state.reducer.playMode === PLAY_MODE_TYPES.RANDOM_PLAY){
//					返回值不能等于原来的 index
			currentIndex = random(currentIndex, len);
		}else if (currentIndex > 0){
			currentIndex--;
		}else{
			currentIndex = len - 1;
		}
		dispatch(getChangeCurrentMusic(musicList[currentIndex]));
		dispatch(getChangeCurrentIndex(currentIndex));
	}
}

//		播放下一首
export const playNextMusicAction = () => {
	return (dispatch, getState) => {
		const state = getState();
		const { musicList } = state.reducer;
		let { currentIndex } = state.reducer;
		const len = musicList.length;
		if(len === 0 || len === 1){
			return;
		}
//				随机播放
		if(state.reducer.playMode === PLAY_MODE_TYPES.RANDOM_PLAY){
//					返回值不能等于原来的 index
			currentIndex = random(currentIndex, len);
		}else if (currentIndex < len - 1){
			currentIndex++;
		}else{
			currentIndex = 0;
		}
		dispatch(getChangeCurrentMusic(musicList[currentIndex]));
		dispatch(getChangeCurrentIndex(currentIndex));
	}
}

//		加载缓存信息
export const getLoadCacheAction = (cache) => {
	return (dispatch) => {
		dispatch(getChangeVloumeAction(cache.volume));
	}
}
