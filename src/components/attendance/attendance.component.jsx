import React from 'react';

import './attendance.styles.scss';
import AttendanceDropDown from "../attendance-drop-down/attendance-drop-down.component";
import AttendanceContent from "../attendance-content/attendance-content.component";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import {connect} from 'react-redux';
import {setAttendance} from "../../redux/attendance/attendance.action";

import {firestore} from "../../firebase/firebase.utils";

class Attendance extends React.Component{
  constructor(){
    super();
    this.state = {
      attendanceSelector:null,
      subjectArray:null,
      attendanceObject:null
    }
  }

  attendanceHandleFunction = subject => {
    this.setState({attendanceSelector:subject});
  }
  componentWillUnmount(){
    setAttendance({currentAttendance:null})
  }

  componentDidMount(){
    const {attendance} = this.props;
    if(attendance == null){
      console.log("getting attendance first time");
      const {setAttendance}=this.props;
      const {Year,SectionID} = this.props.currentUser;
      const regNum = this.props.currentUser['Registration Number'];
      const attendanceRef = firestore.collection(`Attendance/Year${Year}/${SectionID}/${regNum}/Attendance`);
      const subjectArray = [];
      const attendanceObject = {};
      attendanceRef.get().then(snapshot => {
        console.log(snapshot);
        snapshot.forEach(doc => {
          subjectArray.push(doc.id);
          attendanceObject[doc.id]=doc.data();
        })
        console.log(subjectArray);
        console.log(attendanceObject);
      }).catch(error=>{
        console.log(error);
      })

      setAttendance({subjectArray:subjectArray,attendanceObject:attendanceObject});
      this.setState({subjectArray:subjectArray,attendanceObject:attendanceObject});
    }else{
      this.setState({subjectArray:attendance.subjectArray,attendanceObject:attendance.attendanceObject})
    }
  }
  render(){
    const subjectArray = this.state.subjectArray;
    const attendanceObject = this.state.attendanceObject;
    const attendanceSelector = this.state.attendanceSelector;
    return(
      <div className="attendance-content">
      <Card>
        <CardContent>
        <div className="attendance-subject-dropDown">
            <AttendanceDropDown handleFunction = {this.attendanceHandleFunction} subjectArray={subjectArray}/>
        </div>
          
          <AttendanceContent attendanceSelector={attendanceSelector} attendanceObject={attendanceObject}/>
        </CardContent>
      </Card>
    </div>
      
  )
  }
    
}

const mapDispatchToProps = dispatch => ({
  setAttendance : attendance => dispatch(setAttendance(attendance))
})
const mapStateToProps = (state) =>({ 
  currentUser: state.user.currentUser,
  attendance:state.attendance.currentAttendance
})

export default connect(mapStateToProps,mapDispatchToProps)(Attendance);