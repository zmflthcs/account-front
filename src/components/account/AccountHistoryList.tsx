import React from 'react';
import {Link} from 'react-router-dom';
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
/*
interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
*/
/*
const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];
*/


interface Column {
  id: 'date' | 'type'| 'name' | 'content' | 'cost' ;
  label: string;
  minWidth? : number;
  align? : "center" | "left" | "right" | "inherit" | "justify" | undefined,
  format? : (value: number) => string;
}
const columns: Column[] = [
  {id: 'date', label: '날짜', minWidth: 120, align: 'center'},
  {id: 'type', label: '구분', minWidth: 100, align: 'center'},
  {id: 'content', label: '내용', minWidth: 190, align: 'center'},
  {id: 'cost', label: '금액', minWidth: 170, align: 'center'}
]


interface Data {
  date: string;
  type: string;
  content: string,
  cost: number
}

function createData(date:string, type: string, content: string, cost: number): Data {
  return { date, type, content, cost };
}

const data =[1,2,3,4,5,6,7,8,9]
const time = new Date();
const rows =   data.map((i)=>createData(time.toDateString(), '지출', '맛', i))


const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  container: {
    maxHeight: 440,
  },
  addButton:{
    position: 'absolute',
    bottom: '80px',
    right: '20px',
    lineHeight: '0',
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  }
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
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