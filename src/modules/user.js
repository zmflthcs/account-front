import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import { startLoading, finishLoading } from './loading';
import { call, put,takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
const GET_KAKAO_USER_INFO = 'user/GET_KAKAO_USER_INFO'
const GET_KAKAO_USER_INFO_SUCCESS = 'user/GET_KAKAO_USER_INFO_SUCCESS';
const GET_KAKAO_USER_INFO_FAILURE = 'user/GET_KAKAO_USER_INFO_FAILURE';

const SET_USER_INFO = 'user/SET_USER_INFO';

export const getKakaoUserInfo = createAction(GET_KAKAO_USER_INFO, (code)=>code);
export const setUserInfo = createAction(SET_USER_INFO,(nickname, userImage)=> ({nickname, userImage}))

const initialState = {
    nickname: '',
    userImage: '',
    userError: null,
}


function* getKakaoUserInfoSaga(action){
    yield put(startLoading(GET_KAKAO_USER_INFO));
    
    try{
        console.log('inside saga');
        const user = yield call(api.getKakaoUser, action.payload);
        console.log(user);
        yield put({
            type: GET_KAKAO_USER_INFO_SUCCESS,
            payload: user.data
        });
    }catch(e){
        yield put({
            type: GET_KAKAO_USER_INFO_FAILURE,
            payload:e,
            error: true
        });
    }
    yield put(finishLoading(GET_KAKAO_USER_INFO));
}

export function* userSaga(){
    yield takeLatest(GET_KAKAO_USER_INFO, getKakaoUserInfoSaga);
}

const user = handleActions({
    [GET_KAKAO_USER_INFO_SUCCESS] : (state,action)=>({
        nickname: action.payload.nickname,
        userImage: action.payload.userImage,
        userError: null
    }),
    [GET_KAKAO_USER_INFO_FAILURE] : (state,action)=>({
        ...state,
        userError: action.payload
    }),
    [SET_USER_INFO] : (state, action)=> {
        console.log('set user info')
        console.log(action)
        return({
        ...state,
        nickname: action.payload.nickname,
        userImage: action.payload.userImage
    })
}
},initialState)

export default user;