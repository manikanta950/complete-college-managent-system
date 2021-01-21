import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    margin:"auto",
    width: '60%',
    
    marginTop: '10vh',
    overflowX: 'auto',
  },
  table: {
    minWidth: 350,
    
  },
}));


const ScheduleTable=(props) =>{
  const classes = useStyles();
  const {scheduleSelector,scheduleObject} = props;
  console.log(scheduleSelector,scheduleObject);
  var rows = [];
  if(scheduleSelector ==null || scheduleObject == null){

  }else{
    const testArray = Object.keys(scheduleObject[scheduleSelector]);
    console.log(testArray)
    rows = testArray.map(key => (
     {testName:key,dates:(scheduleObject[scheduleSelector][key]).toDate().toDateString().toString()}
    ))
    console.log(rows);
  }
  
  

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Test Name</TableCell>
            <TableCell align="center">dates</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.testName}>
              <TableCell component="th" scope="row">
                {row.testName}
              </TableCell>
              <TableCell align="center">{row.dates}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ScheduleTable;