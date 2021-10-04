import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import CategoriesContainer from '../containers/CategoriesContainer';

const useStyles = makeStyles({})

function AddCategoryPage() {
    return (
    <div>
      <Typography component="h1" variant="h5" paragraph>
          카테고리 추가
      </Typography>
      <CategoriesContainer/>
    </div>
  );
}

export default AddCategoryPage;
