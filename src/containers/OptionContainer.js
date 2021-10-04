import React, {useEffect} from 'react';
import AccountDate from '../components/account/AccountDate';
import CategoriesDropdown from '../components/account/CategoriesDropdown';
import IncomeExpenseDropdown from '../components/account/IncomeExpenseDropdown';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import {getRecord} from '../modules/record';
import {setStartDate, setEndDate,setCategory, setType} from '../modules/searchOption';
import { getCategories } from '../modules/category';
import {connect} from 'react-redux';




const useStyles = makeStyles({
  searchButton: {
    marginRight: '1rem',
    marginTop: '1rem'
  }
});

const OptionContainer = ({
  categories,
  categoryOption,
  typeOption,
  startDateOption,
  endDateOption,
  setCategory,
  setType,
  setStartDate,
  setEndDate,
  getRecord,
  getCategories
}) =>{
  

    const classes = useStyles();
  
    useEffect(()=>{
    console.log('get categories');
    getCategories();
  },[getCategories]);



    return(
      
        <Grid container xs={12} justifyContent="flex-end" alignItems="flex-end">
          <Grid xs={12} sm={6} md={2} ><IncomeExpenseDropdown selectedType={typeOption} onChange={setType}/></Grid>
          <Grid xs={12} sm={6} md={2}><CategoriesDropdown categories={categories} selectedCategory={categoryOption} onChange={setCategory} type={typeOption}/></Grid>
          <Grid xs={12} sm={6} md={3}><AccountDate labelName="From" date={startDateOption} setDate={setStartDate}/></Grid>
          <Grid xs={12} sm={6} md={3}><AccountDate labelName="To" date={endDateOption} setDate={setEndDate}/></Grid>
          
          <Button className={classes.searchButton} variant="contained" color="primary" onClick={getRecord}>
            검색
          </Button>
        </Grid>
      
    )
}


export default connect(
  ({category, searchOption}) => ({
    categories: category.categories,
    categoryOption: searchOption.category,
    typeOption: searchOption.type,
    startDateOption: searchOption.startDate,
    endDateOption: searchOption.endDate,
  }),{
    setStartDate,
    setEndDate,
    setType,
    setCategory,
    getRecord,
    getCategories
  }
)(OptionContainer);