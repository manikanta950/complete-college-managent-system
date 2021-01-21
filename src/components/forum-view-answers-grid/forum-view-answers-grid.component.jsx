import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "15px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    
  },
  author:{
      display:"block",
      position:"relative",
      
      
      textAlign:"right"
  },
  text:{
    padding:0,
    margin:0,
    fontSize:'16px',
    color:"black"
  }
}));

const ForumAnswers = (props) => {
  const classes = useStyles();
  const {forumAnswerArray}=props;
  console.log(forumAnswerArray);
  console.log(props);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        
        {forumAnswerArray ? forumAnswerArray.map(answer=>(

          <Grid item xs={12}>
          <Paper className={classes.paper} key={Object.keys(answer)[0]}>
          <p className={classes.text}>{Object.values(answer)[0]["Text"]}</p>
          <Typography variant="h8" className={classes.author}>By {Object.values(answer)[0]["Author"]}</Typography>
          <Typography variant="h8" className={classes.author}>Year {Object.values(answer)[0]["Year"]}</Typography></Paper>
        </Grid>
          
        )):null}
      </Grid>
    </div>
  );
}
export default ForumAnswers;