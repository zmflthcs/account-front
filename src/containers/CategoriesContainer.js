import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import AddCategoryTab from '../components/category/AddCategoryTab';
import {addCategory, removeCategory, resetError} from '../modules/category';

function CategoriesContainer({categories,getCategories,addCategory,removeCategoriesError, removeCategory, resetError, addCategoriesError}){
    return(
        <>
            <AddCategoryTab categories={categories} removeError={removeCategoriesError}  addCategory={addCategory} removeCategory={removeCategory} resetError={resetError} addError={addCategoriesError}/>
        </>
    )
}

export default connect(
    ({category}) => ({
        categories: category.categories,
        removeCategoriesError: category.removeCategoriesError,
        addCategoriesError: category.addCategoriesError,
    }),{
        addCategory,removeCategory, resetError
})(CategoriesContainer);