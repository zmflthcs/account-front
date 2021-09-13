import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { setCategory } from '../../modules/searchOption';

const AddCategoryInput= ({ type,addCategory}) => {
  
    const [categoryName, setCategoryName] = useState('');
    
    const onChangeCategoryName = (e)=>{
        setCategoryName(e.target.value)
    }

    const onClickButton = () => {
        addCategory(categoryName, type);
        setCategoryName('');
    }

    return(
    <>
    <TableRow role="checkbox" >
        <TableCell>    
        <input value={categoryName} onChange={onChangeCategoryName}/>
        </TableCell>
          
        <TableCell>    
            <Button variant="contained" color="primary" component="span" onClick={onClickButton}>
                +
            </Button>
        </TableCell>
        </TableRow>
        </>
)}

export default AddCategoryInput;