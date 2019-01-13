import * as types from './actionTypes';

const defaultState = {
  loginType: null,
  musicList: null,
}
export default (state = defaultState, action) => {
    const newState = state;
    console.log('action',action)
    if(action.value !== null){
      newState.loginType = action.value;
    }
    return newState;
}
