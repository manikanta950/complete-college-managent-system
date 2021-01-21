import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {firestore} from "../../firebase/firebase.utils";
import {connect} from "react-redux";



const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);




const styles =  theme => ({
  root: {
    width: "700px",
    marginBottom:"20px",

    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  loading:{
    padding:"0",
    margin:'0',
    textAlgin:'center',
    width:"100%",
    display:'block',
    color:'red'
  }
});




class TimeTable extends React.Component{
  constructor(){
    super();
    this.state = {
      Monday:[],
      Tuesday:[],
      Wednesday:[],
      Thursday:[],
      rows:[],
      loadingTimeTable:true
      
    }
  }

  componentDidMount(){
    this.getTimeTable();
    

  }

  getTimeTable() {
    const {SectionID,Year,Department} = this.props.currentUser;
    const timetableRef = firestore.doc(`TimeTable2/${Department}/YEAR${Year}/${SectionID}`);

    timetableRef.get().then(doc => {
      const timeTableObj = doc.data();
      const keys=["Monday","Tuesday","Wednesday","Thursday","Friday"];
      
      keys.forEach((item)=>{
        this.setState({
          [item]:timeTableObj[item]
        })
      })
      console.log(this.state);
      const rows = keys.map((key)=>{
        return (this.createData(key,(timeTableObj[key][0]),(timeTableObj[key][1]),(timeTableObj[key][2]),(timeTableObj[key][3]),"Lunch",(timeTableObj[key][4]),(timeTableObj[key][5]),(timeTableObj[key][6]),(timeTableObj[key][7])));
      })

      this.setState({rows:rows});
      this.setState({loadingTimeTable:false});
    }).then(error => {
      console.log(error);
    }
    )
  }

  createData(
    day,
    one,
    two,
    three,
    four,
    lunch,
    five,
    six,
    seven,
    depature
  ) {
    return { day, one, two, three, four, lunch, five, six, seven, depature };
  }

  


  render(){
    const {classes} = this.props;
    const {rows} = this.state
    return (
      <Paper className={classes.root}>
      <p className={classes.loading}>{(this.state.loadingTimeTable ? "Loading Timetable..." : null)}</p>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell align="right">8:10-9:10</StyledTableCell>
              <StyledTableCell align="right">9:10-10:10</StyledTableCell>
              <StyledTableCell align="right">10:35-11:35</StyledTableCell>
              <StyledTableCell align="right">11:35-12:35</StyledTableCell>
              <StyledTableCell align="right">12:35-1:30</StyledTableCell>
              <StyledTableCell align="right">1:30-2:30</StyledTableCell>
              <StyledTableCell align="right">2:30-3:30</StyledTableCell>
              <StyledTableCell align="right">3:35-4:20</StyledTableCell>
              <StyledTableCell align="right">4:30</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.day}>
                <StyledTableCell component="th" scope="row">
                  {row.day}
                </StyledTableCell>
                <StyledTableCell align="right">{row.one}</StyledTableCell>
                <StyledTableCell align="right">{row.two}</StyledTableCell>
                <StyledTableCell align="right">{row.three}</StyledTableCell>
                <StyledTableCell align="right">{row.four}</StyledTableCell>
                <StyledTableCell align="right">{row.lunch}</StyledTableCell>
                <StyledTableCell align="right">{row.five}</StyledTableCell>
                <StyledTableCell align="right">{row.six}</StyledTableCell>
                <StyledTableCell align="right">{row.seven}</StyledTableCell>
                <StyledTableCell align="right">{row.depature}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  
}
const mapStatetoProps = state =>({
  currentUser : state.user.currentUser
})
export default connect(mapStatetoProps)(withStyles(styles)(TimeTable))