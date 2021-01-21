import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    margin: "auto",
    marginTop: theme.spacing(2),

  },
  formControl: {

    marginLeft: "50xp",
    minWidth: 240,
  },
}));

const AttendanceDropDown = (props)=> {
  const attendanceSelector = props.handleFunction;
  const subjectArray = props.subjectArray;
  console.log(subjectArray)
  const classes = useStyles();
  const [exam, setExam] = React.useState('');
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setExam(event.target.value);
    console.log(event.target.value)
    attendanceSelector(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <form autoComplete="off">
      <Button className={classes.button} onClick={handleOpen}>
        Select the Required Subject
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">Subject</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={exam}
          onChange={handleChange}
          inputProps={{
            name: 'subject',
            id: 'demo-controlled-open-select',
          }}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {subjectArray ? subjectArray.map(subject => (
            <MenuItem value={subject} key={subject}>{subject}</MenuItem>
          )) : null}

        </Select>
      </FormControl>
    </form>
  );
}
export default AttendanceDropDown;