import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import RecordDeleteModal from './RecordDeleteModal';
import { deleteRecordById } from '../../lib/api';
const useStyles = makeStyles(theme =>({
    deleteButton: {
      marginRight: '1rem',
      marginTop: '1rem',
      backgroundColor: theme.palette.secondary.light,
      color: 'white',
    },
    infoName:{
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    infoDetail:{
        marginLeft: '1rem',
        marginTop: '0.8rem',
    },
    errorMessage:{
        color: 'red',
        fontWeight: 'bold',
        fontSize: '1.5rem'
    }
  }));


const RecordDetail = ({content, type, date, category, memo, cost, match}) => {
   
    const classes = useStyles();
    const history = useHistory();
    const [deleteCheck, setDeleteCheck] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    const onDeleteButtonClick = () => {
        setDeleteCheck(true);
    }
    
    const onDeleteConfirm = async () => {
        console.log('delete clicked');
        const id = match.params.id;
        try{
            const result = await deleteRecordById(id);
            history.push('/');
        }catch(err){
            setDeleteCheck(false);
            setDeleteError('Failed to delete record');
        }
    }
    const onDeleteCancel = () => {
        setDeleteCheck(false);
    }

    return(
        <Container maxWidth="sm" m={1}>
        <Paper elevation={3} style={{padding: '2rem'}}>
             <Box m={2}>
                 <div className={classes.infoName}>내용</div>
                 <div className={classes.infoDetail}>{content}</div>
             </Box>
             <Box m={2}>
                 <div className={classes.infoName}>날짜</div>
                 <div className={classes.infoDetail}>{date}</div>
             </Box>
             <Box m={2}>
                 <div className={classes.infoName}>수입/지출</div>
                 <div className={classes.infoDetail}>{type}</div>
             </Box>
             <Box m={2}>
                 <div className={classes.infoName}>카테고리</div>
                 <div className={classes.infoDetail}>{category}</div>
             </Box>
             <Box m={2}>
                 <div className={classes.infoName}>금액</div>
                 <div className={classes.infoDetail}>{cost}</div>
             </Box>
             <Box m={2}>
                 <div className={classes.infoName}>메모</div>
                 <div className={classes.infoDetail}>{memo}</div>
             </Box>
 
             <Box m={2}>
                 <div className={classes.errorMessage}>
                     {deleteError}
                 </div>
             </Box>


             <Button className={classes.deleteButton} variant="contained" onClick={onDeleteButtonClick}>
                삭제
            </Button>
        </Paper>
        <RecordDeleteModal open={deleteCheck} confirm={onDeleteConfirm} cancel={onDeleteCancel}/>
 </Container>
    )
}

export default withRouter(RecordDetail);