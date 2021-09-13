import React, {useEffect} from 'react';
import AccountHistoryList from '../components/account/AccountHistoryList';
import {connect} from 'react-redux';
import {getCategories, getRecord} from '../modules/account';

const AccountContainer = ({categories, record, loadingCategories, loadingRecord, getCategories, getRecord,

}) =>{
   
  useEffect(()=>{
     getRecord();
     getCategories();
   },[getCategories, getRecord]);
   

    return(
        <div>
        <AccountHistoryList rows={record}/>
        
        </div>
    )
}

export default connect(
  ({account, loading}) => ({
    record: account.record,
    loadingCategories: loading['account/GET_CATEGORIES'],
    loadingRecord: loading['account/GET_RECORD']  
  }),{
    getCategories,
    getRecord,
  }
)(AccountContainer);