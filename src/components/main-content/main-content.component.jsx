import React from "react";
import Schedule from "../schedule/schedule.component";
import Announcement from "../announcement/annoucement.component";
import Profile from "../profile/profile.component";
import { makeStyles } from "@material-ui/core/styles";
import Forum from "../forum/forum.component";
import { Switch,Route } from "react-router-dom";
import ViewAnswers from "../forum-view-answers/forum-view-answers.component";
const useStyles = makeStyles(theme => ({
  mainContent: {
    width: "100%",
    padding: "10px",
    height: "90vh",
    marginTop: "75px",
    marginBottom:"20px"
  }
}));
const Maincontent = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContent}>
    <Switch>
      <Route exact path="/home/profile" component={Profile}></Route>
      {/* <Route exact path="/home/forum" component={Forum}></Route>
      <Route exact path="/home/announcement" component={Announcement}></Route>
      <Route exact path="/home/schedule" component={Schedule}></Route> */}
      <Route exact path="/home/announcement" component={Announcement}></Route>
      <Route exact path="/home/schedule" component={Schedule}></Route>
      <Route exact path="/home/forum" component={Forum}></Route>
      <Route path="/home/viewanswers/:id" component={ViewAnswers}></Route>
      </Switch>
    </div>
  );
};

export default Maincontent;
