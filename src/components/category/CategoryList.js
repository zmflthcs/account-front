import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import TableRow from '@material-ui/core/TableRow';
import AddCategoryInput from './AddCategoryInput';
const columns = [
    { id: 'content', label: '카테고리 이름', minWidth: 170},
  ];
  
  
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    removeIcon :{
      "&:hover": {
        cursor:'pointer'
      }
    }
  });
  

export default function CategoryList({categories,type, addCategory,removeCategory}){
    const classes = useStyles();

    const onClickRemoveCategory = (id) => {
      removeCategory(id)
    }


    return(
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
                <TableBody>
              
              
              {
              categories.map((category,i)=> {
                  return(
                      <TableRow role="checkbox" tabIndex={-1} key={i}>
                          <TableCell>{category.text}</TableCell>
                          <TableCell>
                             <RemoveCircleIcon color="secondary" className={classes.removeIcon} onClick={()=>onClickRemoveCategory(category.id)}/>
                         </TableCell>
                      </TableRow>
                  )
              })
            }     
          
           
           
              
            </TableBody>
          </Table>
        </TableContainer>
        <AddCategoryInput type={type} addCategory={addCategory}/>
      </Paper>
    );
  }
  

