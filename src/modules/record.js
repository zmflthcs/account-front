import produce from 'immer';
import {createAction, handleActions} from 'redux-actions';
import { call, put,takeLatest, select } from 'redux-saga/effects';
import * as api from '../lib/api';
import { startLoading, finishLoading } from './loading';

const GET_RECORD = 'record/GET_RECORD';
const GET_RECORD_SUCCESS = 'record/GET_RECORD_SUCCESS';
const GET_RECORD_FAILURE = 'record/GET_RECORD_FAILURE';



export const getRecord = createAction(GET_RECORD);

const getOption = state => (state.searchOption);


function* getRecordSaga({payload}){
    const option = yield select(getOption);
    let params = {};
    console.log(option);
    yield put(startLoading(GET_RECORD));
    for(let k in option){
        if(option[k]){
            params[k] = option[k]
        }
    }
    try {
    
        const records = yield call(api.getRecord, params);
        yield put({
            type: GET_RECORD_SUCCESS,
            payload: records.data.records
        })
    }catch(e){
        yield put({
            type: GET_RECORD_FAILURE,
            payload: e
        })
    }
    yield put(finishLoading(GET_RECORD));
}


export function* recordSaga(){
    yield takeLatest(GET_RECORD, getRecordSaga);
}

const initialState = {
    record: [],
    getRecordError: null
}

const record = handleActions({
     [GET_RECORD_SUCCESS]: (state, action)=> {
         return produce(state, draft => {
             draft.record = action.payload
         })
     },
     [GET_RECORD_FAILURE] : (state, action) => {
         return produce(state, draft=> {
             draft.getRecordError = action.payload
         })
     },
}, initialState);

export default record;