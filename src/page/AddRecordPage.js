import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import AddRecordContainer from '../containers/AddRecordContainer';
const useStyles = makeStyles({})

function AddRecordPage() {
  const classes = useStyles();
    return (
    <div>
      <Typography component="h1" variant="h5">
          가계부 추가
      </Typography>
      <AddRecordContainer/>
    </div>
  );
}

export default AddRecordPage;
