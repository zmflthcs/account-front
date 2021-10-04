import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import { startLoading, finishLoading } from './loading';
import { call, put,takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';

const ADD_EXPENSE_LIST = 'addRecord/ADD_EXPENSE_LIST';
const ADD_INCOME_LIST= 'addRecord/ADD_INCOME_LIST';

const REMOVE_EXPENSE_LIST = 'addRecord/REMOVE_EXPENSE_LIST';
const REMOVE_INCOME_LIST = 'addRecord/REMOVE_INCOME_LIST';

const SET_DATE = 'addRecord/SET_DATE';

const UPLOAD_RECORD = 'addRecord/UPLOAD_RECORD';
const UPLOAD_RECORD_SUCCESS = 'addRecord/UPLOAD_RECORD_SUCCESS';
const UPLOAD_RECORD_FAILURE = 'addRecord/UPLOAD_RECORD_FAILURE';


export const addExpenseList = createAction(ADD_EXPENSE_LIST, (content, category, cost, memo) => ({content, category, cost, memo}) );
export const addIncomeList = createAction(ADD_INCOME_LIST, (content, category, cost, memo) => ({content, category, cost, memo}));

export const removeExpenseList = createAction(REMOVE_EXPENSE_LIST, (index)=>({index}));
export const removeIncomeList = createAction(REMOVE_INCOME_LIST, (index)=>({index}))

export const setDate = createAction(SET_DATE);

export const uploadRecord = createAction(UPLOAD_RECORD, (income, expense, date)=>({income, expense, date}));




function* uploadRecordSaga({payload}) {

    yield put(startLoading(UPLOAD_RECORD));
    try{
        const addResult=yield call(api.addRecord, payload.income, payload.expense, payload.date);
        yield put({type: UPLOAD_RECORD_SUCCESS});
    } catch(e){
        yield put({type: UPLOAD_RECORD_FAILURE})
    }
    yield put(finishLoading(UPLOAD_RECORD))
}

const initialState = {
    expenseList: [],
    incomeList: [],
    date: ''
};

export function* addRecordSaga(){
    yield takeLatest(UPLOAD_RECORD,uploadRecordSaga);
}

const addRecord = handleActions({
    [ADD_EXPENSE_LIST]: (state, {payload: {content, category, cost, memo}})=>{ 
        return produce(state, draft =>{
        draft.expenseList.push({
            content, category, cost, memo,
            'type':'expense'
        });
    })
    },

    [ADD_INCOME_LIST]: (state, {payload: {content, category, cost, memo}}) => {
 
        return produce(state, draft => {
            draft.incomeList.push({
                content, category, cost, memo,
                'type': 'income'
            })
        })
    },

    [REMOVE_INCOME_LIST]: (state, {payload : {index}}) => {
        return produce(state, draft=>{
            draft.incomeList.splice(index,1)
        })
    },
    [REMOVE_EXPENSE_LIST]: (state,{payload : {index}}) => {
        return produce(state, draft=>{
            draft.expenseList.splice(index,1)
        })
    },
    [SET_DATE]: (state, {payload}) => {
        
        return produce(state, draft=>{
            draft.date=payload
        })
    },
    [UPLOAD_RECORD_SUCCESS]: (state, action) => {
        return {
            expenseList: [],
            incomeList: [],
            date: '',
        }
    },
    
}, initialState)

export default addRecord;