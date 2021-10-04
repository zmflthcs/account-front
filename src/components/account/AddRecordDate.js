import React, { useState, useCallback } from 'react';
import { Calendar } from '@natscale/react-calendar';
import '@natscale/react-calendar/dist/main.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  calenderContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem'
  }
});
export default function AddRecordDate({date, onChangeDate}) {
  const classes = useStyles();
  const onChange= (val) => {
    console.log(val)
    onChangeDate(val);
  }
  return (
    <div className={classes.calenderContainer}>
      <Calendar value={date} onChange={onChange}/>
    </div>
  );
}