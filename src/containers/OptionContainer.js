import React, {useState, useEffect} from 'react';
import AccountDate from '../components/account/AccountDate';
import CategoriesDropdown from '../components/account/CategoriesDropdown';
import IncomeExpenseDropdown from '../components/account/IncomeExpenseDropdown';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddCategory from '../components/account/AddCategory';
import {setStartDate, setEndDate,setCategory, setType} from '../modules/searchOption';
import {getCategories, addCategory} from '../modules/account';
import {connect} from 'react-redux';


const useStyles = makeStyles({
  optionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: '1.5rem'
  },
  optionElements: {
    display: 'flex',
    alignItems: 'center'
  },
  searchButton: {
    marginRight: '1rem'
  }
});

const OptionContainer = ({
  categories,
  categoryOption,
  typeOption,
  startDateOption,
  endDateOption,
  setStartDate,
  setEndDate,
  setType,
  setCategory,
  addCategory
}) =>{
  
    const [categoryModalOpen,setCategoryModalOpen] = useState(false)
  
    const classes = useStyles({
      
      searchButton: {
        
      }
    });
    return(
        <div className={classes.optionContainer}>
        <div className={classes.optionElements}>
        <IncomeExpenseDropdown selectedType={typeOption} onChange={setType}/>
        <CategoriesDropdown categories={categories} selectedCategory={categoryOption} onChange={setCategory} type={typeOption}/>
        <Button
        variant="contained"
        color="default"
        startIcon={<CloudUploadIcon />}
        onClick={()=>setCategoryModalOpen(true)}
        >
        추가
      </Button>
        <AccountDate labelName="From" date={startDateOption} setDate={setStartDate}/>
        <AccountDate labelName="To" date={endDateOption} setDate={setEndDate}/>
        {<AddCategory open={categoryModalOpen} handleOpen={setCategoryModalOpen} addCategory={addCategory}/>}
      </div>
      <Button className={classes.searchButton} variant="contained" color="primary">
        검색
      </Button>
      </div>
    )
}


export default connect(
  ({account, searchOption}) => ({
    categories: account.categories,
    categoryOption: searchOption.category,
    typeOption: searchOption.type,
    startDateOption: searchOption.startDate,
    endDateOption: searchOption.endDate,
  }),{
    setStartDate,
    setEndDate,
    setType,
    setCategory,
    addCategory
  }
)(OptionContainer);