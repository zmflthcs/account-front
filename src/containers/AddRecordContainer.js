import React, {useEffect, useState, useReducer} from 'react';
import {connect} from 'react-redux';
import AddRecordDate from '../components/account/AddRecordDate';
import AddRecordTab from '../components/account/AddRecordTab';
import {getCategories} from '../modules/account';
import {uploadRecord} from '../modules/addRecord';
import Button from '@material-ui/core/Button';
import {addExpenseList, addIncomeList, removeExpenseList, removeIncomeList, setDate} from '../modules/addRecord';

const AddRecordContainer = ({categories, date, getCategories, incomeList, expenseList,
    addExpenseList,
    addIncomeList, 
    removeExpenseList, 
    removeIncomeList,
    uploadRecord,
    setDate}) =>{
    
    
    const onClickUploadRecord = () => {
        if(date===''){
            window.alert('날짜를 선택해주셔야 합니다');
        }else{
            console.log(date)
            uploadRecord(incomeList, expenseList, date);
        }

    }

    useEffect(()=>{
        //getRecord();
        getCategories();
      },[getCategories]);
      
    
    return (
        <>
    <AddRecordDate date={date} onChangeDate={setDate}/>
    <AddRecordTab categories={categories} expenseList={expenseList} addExpenseList={addExpenseList}
    incomeList={incomeList}
    addIncomeList={addIncomeList}
    removeExpenseList={removeExpenseList}
    removeIncomeList={removeIncomeList}
    />
    <Button variant="contained" color="primary" onClick={onClickUploadRecord}>추가</Button>
    </>
    )
}

export default connect(
    ({account, addRecord}) => {return ({
        categories: account.categories,
        expenseList: addRecord.expenseList,
        incomeList: addRecord.incomeList,
        date: addRecord.date
    })
},{
        getCategories,
        addExpenseList,
        addIncomeList, 
        removeExpenseList, 
        removeIncomeList, 
        setDate,
        uploadRecord
    }
)(AddRecordContainer)