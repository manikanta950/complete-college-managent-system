import {combineReducers} from 'redux';
import userReducer from "./user/user.reducer";
import scheduleReducer from "./schedule/schedule.reducer";
import attendanceReducer from "./attendance/attendance.reducer";
export default combineReducers({
    user:userReducer,
    schedule:scheduleReducer,
    attendance:attendanceReducer
})