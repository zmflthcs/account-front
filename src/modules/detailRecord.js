import {createAction, handleActions} from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import { startLoading, finishLoading } from './loading';
import produce from 'immer';    

const GET_DETAIL_RECORD = 'detail_record/GET_DETAIL_RECORD';
const GET_DETAIL_RECORD_SUCCESS = 'detail_record/GET_DETAIL_RECORD_SUCCESS';
const GET_DETAIL_RECORD_FAILURE = 'detail_record/GET_DETAIL_RECORD_FAILURE';

export const getDetailRecord = createAction(GET_DETAIL_RECORD, (id)=>id);


function *getDetailRecordSaga({payload}){
    yield startLoading(GET_DETAIL_RECORD);
    try{
        const detailRecord=yield call(api.getRecordById,payload);
        console.log(detailRecord);
        detailRecord.data.type === 'income' ? detailRecord.data.type = '수입' : detailRecord.data.type = '지출';
        if(!detailRecord.data.category){
            detailRecord.data.category={}
            detailRecord.data.category.text = '기타';
        }
        yield put({
            type: GET_DETAIL_RECORD_SUCCESS,
            payload: detailRecord.data
        });
    }catch(err){
        yield put({
            type: GET_DETAIL_RECORD_FAILURE,
            payload: err,
        })
    }
    yield finishLoading(GET_DETAIL_RECORD);
}

export function* detailRecordSaga(){
    yield takeLatest(GET_DETAIL_RECORD, getDetailRecordSaga);
}

const initialState = {
    content: '',
    cost: 0,
    category: '',
    date: '',
    memo: '',
    type: '',
    errorMessage: ''
}

const detailRecord = handleActions({
    [GET_DETAIL_RECORD_SUCCESS] : (state, {payload}) => ({
        content : payload.content,
        cost : payload.cost,
        date : payload.date,
        category: payload.category.text,
        type: payload.type,
        memo: payload.memo
    }),
    [GET_DETAIL_RECORD_FAILURE] : (state, {payload}) => ({
        content: '',
        cost: 0,
        category: '',
        date: '',
        memo: '',
        type: '',
        errorMessage : payload
    })
}, initialState)

export default detailRecord;