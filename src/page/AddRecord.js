import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import AddRecordContainer from '../containers/AddRecordContainer';

const useStyles = makeStyles({})

function AddRecord() {
  const classes = useStyles();
    return (
    <div>
    <Typography component="h1" variant="h4">
        Title
    </Typography>
      <AddRecordContainer/>
    </div>
  );
}

export default AddRecord;
