import {createAction, handleActions} from 'redux-actions';
import { call, put,takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import { startLoading, finishLoading } from './loading';

const GET_CATEGORIES = 'account/GET_CATEGORIES';
const GET_CATEGORIES_SUCCESS = 'account/GET_CATEGORIES_SUCCESS';
const GET_CATEGORIES_FAILURE = 'account/GET_CATEGORIES_FAILURE';

const ADD_CATEGORY = 'account/ADD_CATEGORY';
const ADD_CATEGORY_SUCCESS = 'account/ADD_CATEGORY_SUCCESS';
const ADD_CATEGORY_FAILURE = 'account/ADD_CATEGORY_FAILURE';

const REMOVE_CATEGORY = 'account/REMOVE_CATEGORY';
const REMOVE_CATEGORY_SUCCESS = 'account/REMOVE_CATEGORY_SUCCESS';
const REMOVE_CATEGORY_FAILURE = 'account/REMOVE_CATEGORY_FAILURE';

export const getCategories = createAction(GET_CATEGORIES);
export const addCategory = createAction(ADD_CATEGORY, (categoryName, type) => ({categoryName, type}))
export const removeCategory = createAction(REMOVE_CATEGORY, (categoryId)=> categoryId);

function* getCategoriesSaga(){
    yield put(startLoading(GET_CATEGORIES));
    console.log('started redux');
    try{
        const categories = yield call(api.getCategories);
        yield put({
            type: GET_CATEGORIES_SUCCESS,
            payload: categories.data
        })
    } catch(e){
        yield put({
            type: GET_CATEGORIES_FAILURE,
            payload:e,
            error: true
        });
    }
    yield put(finishLoading(GET_CATEGORIES));
}

function* addCategorySaga({payload}){
    yield put(startLoading(ADD_CATEGORY));
    
    try{
        const categories = yield call(api.addCategory, payload.categoryName, payload.type);
       
        yield put({
            type: ADD_CATEGORY_SUCCESS,
            payload: categories.data
        })
    } catch(e){
        yield put({
            type: ADD_CATEGORY_FAILURE,
            payload:e,
            error: true
        });
    }
    yield put(finishLoading(ADD_CATEGORY));
}

function* removeCategorySaga({payload}){
    yield put(startLoading(REMOVE_CATEGORY));
    try{
        const categories = yield call(api.removeCategory, payload);
        yield put({
            type: REMOVE_CATEGORY_SUCCESS,
            payload: categories.data
        })
    }catch(e){
        yield put({
            type: REMOVE_CATEGORY_FAILURE,
            payload: e
        })
    }
    yield put(finishLoading(REMOVE_CATEGORY));
}



export function* categorySaga(){
    yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
    yield takeLatest(REMOVE_CATEGORY, removeCategorySaga);
    yield takeLatest(ADD_CATEGORY,addCategorySaga);
}

const initialState = {
    categories:[],
    categoriesError: null,
}

const account = handleActions({
    [GET_CATEGORIES_SUCCESS]: (state, action) => {
        console.log('get categories success',action);
        return ({ 
        ...state,
        categories: action.payload,
        categoriesError: null,
    })},
    [GET_CATEGORIES_FAILURE]: (state, action) => {
        console.log('get categoreis failure')
        return({
        ...state,
        categoriesError: action.payload
    })},
    [ADD_CATEGORY_SUCCESS]: (state, action) => {
        console.log(action.payload);
        return ({
        ...state,
        categories: action.payload,
        categoreisError: null
    })},
    [ADD_CATEGORY_FAILURE] : (state, action) => ({
        ...state,
        categoriesError: action.payload
    }),
    [REMOVE_CATEGORY_SUCCESS]: (state, action)=> ({
        ...state,
        categories: action.payload,
        categoriesError: null,
    }),
    [REMOVE_CATEGORY_FAILURE]: (state, action)=> ({
        ...state,
        categories: action.payload,
        categoriesError: action.payload
    }),
    

}, initialState)
export default account;