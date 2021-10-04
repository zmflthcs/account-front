import {combineReducers} from 'redux';
import { all } from 'redux-saga/effects';
import category, {categorySaga} from './category';
import record, {recordSaga} from './record';
import loading from './loading'
import searchOption from './searchOption';
import addRecord, {addRecordSaga} from './addRecord';
import user, {userSaga} from './user';
import detailRecord, {detailRecordSaga} from './detailRecord';

const rootReducer = combineReducers({
    category,
    record,
    loading,
    searchOption,
    addRecord,
    user,
    detailRecord
});

export function* rootSaga(){
    yield all([categorySaga(), addRecordSaga(),userSaga(),recordSaga(),detailRecordSaga()])
}

export default rootReducer;