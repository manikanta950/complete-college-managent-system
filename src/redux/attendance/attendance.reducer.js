const INITIAL_STATE = {
    currentAttendance:null
};
const AttendanceReducer = (state=INITIAL_STATE,action) => {
    switch(action.type){
        case 'SET_ATTENDANCE':
            return ({...state,currentAttendance:action.payload});
        case 'RESET':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default AttendanceReducer;