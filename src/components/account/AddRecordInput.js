import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import CategoriesDropdown from './CategoriesDropdown';
import TableRow from '@material-ui/core/TableRow';

const AddRecordInput= ({columns, type, addRecord, categories}) => {
    

    const [selectedCategory, setSelectedCategory] = useState('');
    const [content, setContent]= useState('');
    const [memo,setMemo] = useState('');
    const [cost, setCost] = useState(0)

    const addRecordList = () => {
        if(selectedCategory ===''){
            window.alert('카테고리를 선택하여야 합니다.');
        }else if(content.trim()===''){
            window.alert('사용내역을 입력하셔야 합니다')
        } else{
            addRecord(content,selectedCategory,cost,memo)
            setSelectedCategory('')
            setContent('');
            setMemo('');
            setCost(0)
        }
    }
    
   
    const onChangeCost = (value) => {
        console.log(value);
        if(value===''){
            return setCost(0);
        }
        const cost = parseInt(value.replace(/,/g, ""));
        if (cost){
            setCost(cost);
        }else{
            console.log('wrong input')
        }
    }
    const setFunctions = [setContent, onChangeCost, setSelectedCategory, setMemo];
    const values = [content, cost, selectedCategory, memo];
    return(
    <>
    <TableRow role="checkbox" >
    {
        columns.map((column,i) => {
            //const value = row[column.id];
            if (column.id === 'category'){
                return (
                    <TableCell key={column.id} align={column.align}>
              <CategoriesDropdown categories={categories} selectedCategory={selectedCategory} type={type} onChange={setFunctions[i]}/>
          </TableCell>
          
          )
        }
        return (
            <TableCell key={column.id} align={column.align}>    
            <div>
                <input onChange={(event)=>setFunctions[i](event.target.value)} value={column.format && typeof values[i] === 'number' ? column.format(values[i]) : values[i]}/>
            </div>
            </TableCell>
            );
        })}  
        <TableCell>    
            <Button onClick={addRecordList} variant="contained" color="primary" component="span">
                +
            </Button>
        </TableCell>
        </TableRow>
        </>
)}

export default AddRecordInput;