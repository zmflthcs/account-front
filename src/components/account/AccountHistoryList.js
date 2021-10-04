import React from 'react';
import {Link , useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import category from '../../modules/category';


const columns = [
  {id: 'date', label: '날짜', minWidth: 120, align: 'center'},
  {id: 'category', label: '구분', minWidth: 100, align: 'center'},
  {id: 'content', label: '내용', minWidth: 190, align: 'center'},
  {id: 'cost', label: '금액', minWidth: 170, align: 'center', format: (value) => value.toLocaleString('en-US')}
];



const useStyles = makeStyles({
  root: {
    position: 'relative',
    marginTop: '2rem'
  },
  container: {
    maxHeight: 440,
  },
  addButton:{
    position: 'absolute',
    bottom: '80px',
    right: '20px',
    lineHeight: '0',
    zIndex: '3',
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  },

});

export default function AccountHistoryList({rows}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (even, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const historyListItem = (row, column) => {
    
    const value = row[column.id];
    console.log(column.id);
    if(column.id === 'category'){
      let text=""
      value.type==='income' ? text+='수입/' : text+='지출/';
      text+= value.text;
      return(
      <TableCell key={column.id} align={column.align}>
          {text}
      </TableCell>
      );
    }else{
      return (
        <TableCell key={column.id} align={column.align}>
          {column.format && typeof value === 'number' ? column.format(value) : value}
        </TableCell>
        );
    }
    
  };
  
  const history= useHistory();
  
  const onClickRecord = (id) => {
    history.push(`/record/${id}`)
  }
  console.log(rows);
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
            </TableRow>
          </TableHead>
          <TableBody className={classes.recordBody}>
            {rows.length && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow className={classes.recordRow} hover role="checkbox" tabIndex={-1} key={row.id} onClick={()=>onClickRecord(row.id)}>
                  {columns.map((column) => (
                    historyListItem(row,column)
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Link to='/addrecord'>
      <Fab className={classes.addButton} color="primary" aria-label="add">
          <AddIcon/>
        </Fab>
      </Link>
    </Paper>
  );
}