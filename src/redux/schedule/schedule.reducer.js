const INITIAL_STATE = {
    currentSchedule:null
};
const scheduleReducer = (state=INITIAL_STATE,action) => {
    switch(action.type){
        case 'SET_SCHEDULE':
            return ({...state,currentSchedule:action.payload});
        case 'RESET':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default scheduleReducer;