import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import AnnoucementItem from "../annoucement-item/annoucement-item.component";

import {firestore} from "../../firebase/firebase.utils";
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: "15px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  loading:{
    display:"block",
    width:"100%",
    textAlign:"center"
  }
});

class AnnoucementList extends React.Component {
  constructor(){
    super();

    this.state={
      annoucement_array:[],
      annoucementLoading:true
    }
  }

  componentDidMount(){
    this.getAnnoucements();
  }

  getAnnoucements(){
   
    const announcementArray = [];
    console.log("entered annoucment component");
    const annoucementRef = firestore.collection(`Announcements/CSE/AnnouncementCSE`);
    annoucementRef.get().then( snapshot => {
      snapshot.forEach( doc => {
        console.log(doc.data());
        announcementArray.push(this.createData(doc.data().Heading,doc.data().Number,doc.data().date));
      })
      this.setState({annoucement_array:announcementArray});
      console.log(this.state);
      this.setState({annoucementLoading:false});
    }

    ).catch(error => {
      console.log("Error");
    })

    console.log(this.state);
  }

  createData(heading,number,date){
    return {heading,number,date}
  }
  
  render(){
    const {classes} = this.props;
    const {annoucement_array} = this.state;
  return (
    <div className={classes.root}>
    <p class={classes.loading}>{this.state.annoucementLoading ? "Loading Announcements..." : null}</p>
      <Grid container spacing={1}>
        {annoucement_array.map(announcement => (
          <AnnoucementItem annoucement={announcement.heading} key={announcement.number} date={announcement.date}></AnnoucementItem>
        ))}
      </Grid>
    </div>
  );
  }
}

export default withStyles(styles)(AnnoucementList);