import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import CategoriesContainer from '../containers/CategoriesContainer';

const useStyles = makeStyles({})

function AddRecord() {
  const classes = useStyles();
    return (
    <div>
    <Typography component="h1" variant="h4">
        카테고리
    </Typography>
      <CategoriesContainer/>
    </div>
  );
}

export default AddRecord;
