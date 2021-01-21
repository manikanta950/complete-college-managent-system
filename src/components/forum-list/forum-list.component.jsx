import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ForumPost from "../forum-post/forum-post";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    height: "100%",
    maxHeight: "100px"
  },
  buttonRight: {
    float: "right"
  }
}));

const ForumList = props => {
  const classes = useStyles();
  const questionArray = props.questionArray;
  const { studentID, updateState,Department } = props;
  console.log(questionArray);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* <ForumPost />
        <ForumPost />
        <ForumPost />
        <ForumPost /> */}
        {questionArray.map(question => (
          <ForumPost
            question={question}
            key={Object.keys(question)[0]}
            questionDetails={Object.values(question)[0]}
            id={Object.keys(question)[0]}
            studentID={studentID}
            updateState={updateState}
            Department = {Department}
          />
        ))}
      </Grid>
    </div>
  );
};
export default ForumList;
