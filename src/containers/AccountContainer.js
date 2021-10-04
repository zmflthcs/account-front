import React, {useEffect} from 'react';
import AccountHistoryList from '../components/account/AccountHistoryList';
import {connect} from 'react-redux';
import {getRecord} from '../modules/record';

const AccountContainer = ({categories, record, loadingCategories, loadingRecord, getRecord
}) =>{
  
  
  useEffect(()=>{
     getRecord();
   },[]);
    return(
        <div>
          <AccountHistoryList rows={record}/>
        </div>
    )
}

export default connect(
  ({record, loading}) => ({
    record: record.record,
    loadingRecord: loading['record/GET_RECORD'],
  }),{
    getRecord
  }
)(AccountContainer);