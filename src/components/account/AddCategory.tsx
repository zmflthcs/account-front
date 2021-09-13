import React, {useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '../common/Modal';


const useStyles = makeStyles({
    radioGroup: {
        flexDirection: 'row',
    },
    categoryNameInput:{
        display: 'block'
    },
    cancelIcon:{
        width: '1.5rem',
        "&:hover": { 
            cursor: 'pointer',
        },
    }
});

const AddCategory = ({open, handleOpen,addCategory}) => {
        
    const classes = useStyles();

    const [type, setType] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const onChangeType = (e) => {
        setType(e.target.value);
    }
    
    const onChangeCategoryName = (e)=> {
        setCategoryName(e.target.value);
    }
    
    const registerCategory = async (e) => {
        e.preventDefault();
        
        const result = await addCategory(categoryName, type);
        console.log(1)
        console.log('add category result',result);
        setType('');
        setCategoryName('');
        handleOpen(false);
    }
    
    return(
        <Modal open={open}>
            <CancelIcon onClick={()=>handleOpen(false)} className={classes.cancelIcon}/>
            <h2>카테고리 추가</h2>
            <form>
            <FormControl component="fieldset">
            <FormLabel component="legend">수입/지출</FormLabel>
            <RadioGroup className={classes.radioGroup} aria-label="gender" name="gender1" value={type} onChange={onChangeType}>
                <FormControlLabel value="income" control={<Radio />} label="수입" />
                <FormControlLabel value="expense" control={<Radio />} label="지출" />    
            </RadioGroup>
            </FormControl>
            <TextField className={classes.categoryNameInput} label="카테고리 이름" value={categoryName} onChange={onChangeCategoryName}/>

            <button onClick={registerCategory}>등록</button>
            </form>
        </Modal>
    )
}

export default AddCategory;