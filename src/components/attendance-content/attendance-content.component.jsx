import React from "react";
import "./attendance-content.styles.scss";
const AttendanceContent = props =>{
    const {attendanceSelector,attendanceObject} = props;
    let classesAttended = null;
    let classesConducted = null;
    let attendancePercentage = null;
    if(attendanceSelector != null && attendanceObject !=null){
        classesConducted = attendanceObject[attendanceSelector]['CConducted'];
        classesAttended = attendanceObject[attendanceSelector]['CAttended'];
        attendancePercentage = ((classesAttended/classesConducted)*100).toFixed(2);
    }
    
    return(
        <div>
        <h1>Attendance</h1>
        {attendanceSelector ? 
        (   <div>
            
          <h2>Subject : {attendanceSelector}</h2>
          <div className="attendance-details">
            <h3>Total Classes: {classesConducted}</h3>
            <h3>Classes Attended: {classesAttended}</h3>
            <h3>Percentage: {attendancePercentage}%</h3>
          </div>
          </div>):null}
        
          </div>
    );
}

export default AttendanceContent;
