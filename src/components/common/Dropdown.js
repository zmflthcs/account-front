import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Dropdown({dropdownName, element, onChange, selected }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {

    onChange(event.target.value);
  };

  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  console.log(element, selected);
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="controlled-open-select-label">{dropdownName}</InputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selected}
          onChange={handleChange}
        >
          <MenuItem value={""}>
            <em>전체</em>
          </MenuItem>
          {element.map(e=> (
            <MenuItem value={e.id} key={e.id}>{e.text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}