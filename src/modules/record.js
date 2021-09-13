import {createAction, handleActions} from 'redux-actions';
import { call, put,takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import { startLoading, finishLoading } from './loading';

const GET_RECORD = 'account/GET_RECORD';
const GET_RECORD_SUCCESS = 'account/GET_RECORD_SUCCESS';
const GET_RECORD_FAILURE = 'account/GET_RECORD_FAILURE';


export const getRecord = createAction(GET_RECORD, (category, type, startDate,endDate)=>({category,type,startDate,endDate}));


function* getRecordSaga({payload}){

    yield put(startLoading(GET_RECORD));
    const records = yield call(api.getRecord, payload);
    yield put({
        type: GET_RECORD_SUCCESS,
        payload: records.data
    })
    yield put(finishLoading(GET_RECORD));
}


function* recordSaga(){
    yield takeLatest(GET_RECORD, getRecordSaga);
}