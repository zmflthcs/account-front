import React from 'react';
import Modal from '../common/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modalInfo: {
        textAlign: 'center',
        fontSize: '1.5rem',
        padding: '1.5rem'
    },
    buttonWrapper: {
        display: 'flex',
        padding: '1rem',
        margin: '1rem',
        justifyContent: 'center'
    },
    modalButton: {
        margin: '1rem'
    }
  }));

export default function RecordDeleteModal({open, confirm, cancel}){


    const classes = useStyles();

    return(
    <Modal open={open}>
        <div>
            <div className={classes.modalInfo}>
                <span>정말 삭제하시겠습니까?</span>
            </div>
            
            <div className={classes.buttonWrapper}>
            <Button className={classes.modalButton} variant="contained" color="primary" component="span" onClick={confirm}>
                    확인
            </Button>
            <Button className={classes.modalButton} variant="contained" color="primary" component="span" onClick={cancel}>
                    취소
            </Button>
             </div>
            </div>    
    </Modal>
    );
}