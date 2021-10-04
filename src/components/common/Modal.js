import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



const useStyles = makeStyles((theme) =>
  createStyles({
    modalContent: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: 'white',
      border: '2px solid #000',
      boxShadow: 24,
    },
  }),
);

export default function SimpleModal({children, open}) {
  const classes = useStyles();
  console.log(classes)
  // getModalStyle is not a pure function, we roll the style only on the first render


  const body = (
    <Box className={classes.modalContent}>
      {children}
    </Box>
  );

  return (
    <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    
  );
}