import {combineReducers} from 'redux';
import { all } from 'redux-saga/effects';
import account, {accountSaga} from './account';
import loading from './loading'
import searchOption from './searchOption';
import addRecord, {addRecordSaga} from './addRecord';
import user, {userSaga} from './user';
const rootReducer = combineReducers({
    account,
    loading,
    searchOption,
    addRecord,
    user
});

export function* rootSaga(){
    yield all([accountSaga(), addRecordSaga(),userSaga()])
}

export default rootReducer;