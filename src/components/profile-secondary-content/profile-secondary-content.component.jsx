import React from "react";
import "./profile-secondary-content.styles.scss";
import TimeTable from "../timetable/timetable.component";

import Attendance from "../attendance/attendance.component";
const ProfileSecondaryContent = () => {
  return (
    <div className="attendance-container">
      <div className="timetable">
        <TimeTable />
      </div>
      <Attendance />
    </div>
  );
};

export default ProfileSecondaryContent;
