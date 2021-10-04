import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      padding: '1rem',
      display: 'flex'
    },
    input:{
        width: '90%',
        height: '100%'
    }
   
  }));


const AddCategoryInput= ({ type,addCategory}) => {
  
    const [categoryName, setCategoryName] = useState('');
    const classes = useStyles();

    const onChangeCategoryName = (e)=>{
        setCategoryName(e.target.value)
    }

    const onClickButton = () => {
        addCategory(categoryName, type);
        setCategoryName('');
    }

    return(
    <Grid className={classes.root} container> 
        <Grid xs={9}> 
        <input value={categoryName} className={classes.input} onChange={onChangeCategoryName}/>   
        </Grid>
        <Grid xs={3}>
            <Button variant="contained" color="primary" component="span" onClick={onClickButton}>
                +
            </Button>
            </Grid>
    </Grid>
)}

export default AddCategoryInput;