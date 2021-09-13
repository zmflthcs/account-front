import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {getCategories, addCategory,removeCategory} from '../modules/account';
import {connect} from 'react-redux';
import AddCategoryTab from '../components/category/AddCategoryTab';

function CategoriesContainer({categories,getCategories,addCategory,categoriesError, removeCategory}){
    console.log(addCategory);
    return(
        <>
            <AddCategoryTab categories={categories} addCategory={addCategory} getCategories={getCategories} removeCategory={removeCategory}/>
        </>
    )
}

export default connect(
    ({account}) => ({
        categories: account.categories,
        categoriesError: account.categoriesError
    }),{
        getCategories, addCategory,removeCategory
      })(CategoriesContainer);