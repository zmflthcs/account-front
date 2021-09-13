import {createAction, handleActions} from 'redux-actions';

const SET_START_DATE = 'search_option/SET_START_DATE';
const SET_END_DATE = 'search_option/SET_END_DATE';

const SET_CATEGORY = 'search_option/SET_SELETED_CATEGORY';
const SET_TYPE = 'search_option/SET_TYPE';


export const setStartDate = createAction(SET_START_DATE, date=> date);
export const setEndDate = createAction(SET_END_DATE, date=> date);
export const setCategory = createAction(SET_CATEGORY, category=> category);
export const setType = createAction(SET_TYPE, type=>type);

const initialState = {
    startDate: '',
    endDate: '',
    category: '',
    type:''
}

const searchOption = handleActions({
    [SET_START_DATE]: (state, action)=> ({
        ...state,
        startDate: action.payload
    }),
    [SET_END_DATE]: (state, action) => ({
        ...state,
        endDate: action.payload
    }),
    [SET_CATEGORY]: (state, action) => ({
        ...state,
        category: action.payload
    })
    ,
    [SET_TYPE]: (state,action) => ({
        ...state,
        type: action.payload
    })

}, initialState);

export default searchOption;