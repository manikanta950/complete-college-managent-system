import React from "react";
import ScheduleTable from "../schedule-table/schedule-table.component";
import ScheduleDropDown from "../schedule-drop-down/schedule-drop-down.component";
import {connect} from "react-redux";
import {setSchedule} from "../../redux/schedule/schedule.action";

import {firestore} from "../../firebase/firebase.utils";

class Schedule extends React.Component {

    constructor(){
        super();
        this.state = {
            scheduleSelector:null,
            subjectArray:null,
            scheduleObject:null
        }
    }

    scheduleHandleFunction = subject =>{
        this.setState({scheduleSelector:subject});
    }
    componentDidMount(){

        
        const {schedule}= this.props
        if(schedule === null){
            console.log("first time getting info")
        const {setSchedule} = this.props;
        const department=this.props.currentUser.Department;
        const semester = this.props.currentUser.Semester;
        const scheduleRef =  firestore.collection(`Schedule/${department}/Sem${semester}`)
        const subjectArray = [];
        const scheduleObject = {};
        scheduleRef.get().then(snapshot => {
            console.log(snapshot)
            snapshot.forEach(doc => {
                console.log(doc.data(),doc.id);

                subjectArray.push(doc.id);
                scheduleObject[doc.id]=doc.data();

            })

            console.log(subjectArray);
           
            console.log(scheduleObject);

            setSchedule({subjectArray,scheduleObject});
            this.setState({subjectArray:subjectArray})
            this.setState({scheduleObject:scheduleObject})
            console.log(this.props.schedule)
        }).catch(error => {
            console.log(error)
        })
    }else{
        console.log(schedule);
        this.setState({subjectArray:schedule.subjectArray,
        scheduleObject:schedule.scheduleObject});
    }

        console.log(this.state);
    }




    componentDidUpdate(){
        console.log(this.state);
    }



    render(){
        const subjectArray = this.state.subjectArray;
        
        const scheduleObject = this.state.scheduleObject
        const scheduleSelector = this.state.scheduleSelector;
        return(
            <div>
                <ScheduleDropDown  handleFunction={this.scheduleHandleFunction} subjectArray = {subjectArray}/>
                <ScheduleTable scheduleObject={scheduleObject} scheduleSelector={scheduleSelector}/>
            </div>
        );
    }
   
}

const mapDispatchToProps = dispatch => ({
    setSchedule : schedule => dispatch(setSchedule(schedule))
})

const mapStateToProps = state => ({
    currentUser:state.user.currentUser,
    schedule:state.schedule.currentSchedule
})


export default connect(mapStateToProps,mapDispatchToProps)(Schedule);