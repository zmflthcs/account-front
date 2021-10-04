import React, {useState, useEffect} from 'react';
import { withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {getDetailRecord} from '../modules/detailRecord';
import RecordDetail from '../components/account/RecordDetail';

function DetailRecordContainer({content, category, date, memo, type, match,
errorMessage, cost, getDetailRecord}){


    useEffect(()=>{
        const id = match.params.id;
        getDetailRecord(id);
    },[])
    
    return(
        <>
           <RecordDetail content={content} date={date} category={category} memo={memo} type={type} cost={cost}/>
        </>
    )
}

export default withRouter(connect(
    ({detailRecord}) => ({
        content: detailRecord.content,
        cost: detailRecord.cost,
        category: detailRecord.category,
        date: detailRecord.date,
        memo: detailRecord.memo,
        type: detailRecord.type,
        errorMessage : detailRecord.errorMessage
    }),{
        getDetailRecord
})(DetailRecordContainer));

