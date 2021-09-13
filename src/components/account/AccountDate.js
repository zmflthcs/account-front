import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function AccountDate({labelName, setDate, date}) {
  const classes = useStyles();
  
  const onChangeDate = (e)=> {
    console.log(e.target.value);
    setDate(e.target.value)
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        label={labelName}
        type="date"
        defaultValue=""
        value={date}
        onChange={onChangeDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
