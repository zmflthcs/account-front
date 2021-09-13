import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import { startLoading, finishLoading } from './loading';
import { call, put,takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
const GET_KAKAO_USER_INFO = 'user/GET_KAKAO_USER_INFO'
const GET_KAKAO_USER_INFO_SUCCESS = 'user/GET_KAKAO_USER_INFO_SUCCESS';
const GET_KAKAO_USER_INFO_FAILURE = 'user/GET_KAKAO_USER_INFO_FAILURE';

export const getKakaoUserInfo = createAction(GET_KAKAO_USER_INFO, (code)=>code);

const initialState = {
    name: '',
    userError: null,
}


function* getKakaoUserInfoSaga(action){
    yield put(startLoading(GET_KAKAO_USER_INFO));
    
    try{
        console.log('inside saga');
        const user = yield call(api.getKakaoUser, action.payload);
        
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
        name: action.payload.name,
        userError: null
    }),
    [GET_KAKAO_USER_INFO_FAILURE] : (state,action)=>({
        ...state,
        userError: action.payload
    })
},initialState)

export default user;