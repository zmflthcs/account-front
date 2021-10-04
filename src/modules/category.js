import {createAction, handleActions} from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import { startLoading, finishLoading } from './loading';
import produce, { produceWithPatches } from 'immer';    


const GET_CATEGORIES = 'category/GET_CATEGORIES';
const GET_CATEGORIES_SUCCESS = 'category/GET_CATEGORIES_SUCCESS';
const GET_CATEGORIES_FAILURE = 'category/GET_CATEGORIES_FAILURE';

const ADD_CATEGORY = 'category/ADD_CATEGORY';
const ADD_CATEGORY_SUCCESS = 'category/ADD_CATEGORY_SUCCESS';
const ADD_CATEGORY_FAILURE = 'category/ADD_CATEGORY_FAILURE';

const REMOVE_CATEGORY = 'category/REMOVE_CATEGORY';
const REMOVE_CATEGORY_SUCCESS = 'category/REMOVE_CATEGORY_SUCCESS';
const REMOVE_CATEGORY_FAILURE = 'category/REMOVE_CATEGORY_FAILURE';

const RESET_ERROR = 'category/RESET_ERROR';


export const getCategories = createAction(GET_CATEGORIES);
export const addCategory = createAction(ADD_CATEGORY, (categoryName, type) => ({categoryName, type}))
export const removeCategory = createAction(REMOVE_CATEGORY, (categoryId)=> ({categoryId}));
export  const resetError = createAction(RESET_ERROR);

function* getCategoriesSaga(){
    yield put(startLoading(GET_CATEGORIES));
    console.log('started redux');
    try{
        const categories = yield call(api.getCategories);
        yield put({
            type: GET_CATEGORIES_SUCCESS,
            payload: categories.data.categories
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
    let success = true;
    
    try{
        const categories = yield call(api.addCategory, payload.categoryName, payload.type);
        yield put({
            type: ADD_CATEGORY_SUCCESS,
            payload: categories.data
        });

    } catch(e){
        success =false;
        yield put({
            type: ADD_CATEGORY_FAILURE,
            payload: 'failed to create category',
            error: true
        }); 
    }
    yield put(finishLoading(ADD_CATEGORY));
    
    if (success){
        yield getCategoriesSaga();
    }
}

function* removeCategorySaga({payload}){
    yield put(startLoading(REMOVE_CATEGORY));
    let success = true;
    try{
        const categories = yield call(api.removeCategory, payload.categoryId);
        yield put({
            type: REMOVE_CATEGORY_SUCCESS,
            payload: categories.data
        });
        
    }catch(e){
        
        success = false;
        yield put({
            type: REMOVE_CATEGORY_FAILURE,
            payload: e.response.data.message,
            error: true
        });
        
    }
    yield put(finishLoading(REMOVE_CATEGORY));
    
    if(success){
        yield getCategoriesSaga()
    };
}



export function* categorySaga(){
    yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
    yield takeLatest(REMOVE_CATEGORY, removeCategorySaga);
    yield takeLatest(ADD_CATEGORY,addCategorySaga);
}

const initialState = {
    categories:[],
    getCategoriesError: null,
    removeCategoriesError: null,
    addCategoriesError: null,
}

const category = handleActions({
    [GET_CATEGORIES_SUCCESS]: (state, action) => {
        console.log('get categories success',action);
        return produce(state, draft=>{
            draft.categories = action.payload
            draft.getCategoriesError = null
        }) 
    },
    [GET_CATEGORIES_FAILURE]: (state, action) => {
        console.log('get categoreis failure')
        return produce(state,draft => {
            draft.getCategoriesError= action.payload
        })},
    [ADD_CATEGORY_SUCCESS]: (state, action) => {
        console.log(action.payload);
        return produce(state, draft=> {
            draft.addCategoriesError= null
    })},

    [ADD_CATEGORY_FAILURE]: (state, action) => {
        return produce(state, draft => {
            draft.addCategoriesError = action.payload;
        })
    },

    [REMOVE_CATEGORY_SUCCESS]: (state, action)=>{
        return produce(state, draft=>{
            draft.removeCategoriesError = null
        })
    },

    [REMOVE_CATEGORY_FAILURE]: (state, action)=> {
        return produce(state, draft=>{
            draft.removeCategoriesError = action.payload
        })
    },
    [RESET_ERROR] : (state, action) => {
        return produce(state, draft=> {
            draft.removeCategoriesError = null;
            draft.addCategoriesError = null;
        })
    }

    

}, initialState)
export default category;