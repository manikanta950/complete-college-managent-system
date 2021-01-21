import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";


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
    date:{
      padding:0,
      margin:0,
      float:"right"
    }
  });

const AnnouncementItem = (props) => {
    const {classes,annoucement,date} = props;
return(
    
        <Grid item xs={12}>
        <Paper className={classes.paper}>
        {annoucement}
        <h6 className = {classes.date}>{date}</h6>
        </Paper>
      </Grid>
    
);
}
export default withStyles(styles)(AnnouncementItem);