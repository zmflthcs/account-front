import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import TableRow from '@material-ui/core/TableRow';
import AddRecordInput from './AddRecordInput';

const columns = [
  { id: 'content', label: '사용내역', minWidth: 80},
  { id: 'cost', label: '금액', minWidth: 30, format: (value) => value.toLocaleString('en-US'), },
  {
    id: 'category',
    label: '카테고리',
    minWidth: 85,
    align: 'right',
  },
  {
    id: 'memo',
    label: '메모',
    minWidth: 100,
    align: 'right',
  },
];


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function AddRecordList({categories, rows, addRecord, removeRecord, type }) {
  const classes = useStyles();




  return (
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
              <TableCell key={'button'}>
                  
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            
            rows.map((row,i) => {
              return (
                <TableRow role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'category'){
                      console.log(categories, value);
                      const find = categories.find((c)=>c.id===value)
                      const categoryText = categories.length && find ? find.text : ''
                      
                      return (
                            <TableCell key={column.id} align={column.align}>
                              {categoryText}
                            </TableCell>
                            
                        )
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>    
                            <div>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </div>
                      </TableCell>
                    );
                  })}
                  <TableCell>
                  <RemoveCircleIcon color="secondary" onClick={()=>removeRecord(i)}/>
                </TableCell>
                </TableRow>
              );
            })}
            

          <AddRecordInput columns={columns} categories={categories} addRecord={addRecord} type={type}/>            
            
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  );
}
/*
<TableCell onClick={()=>setTargetInput({rowNum:i,target:column.id})} key={column.id} align={column.align}>    
<div>
    {column.format && typeof value === 'number' ? column.format(value) : value}
</div>

</TableCell>
*/