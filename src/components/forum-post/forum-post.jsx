import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import AnswerQuestionModal from "../forum-answer-question-modal/forum-answer-question-modal";
import { firestore } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  grid: {
    padding: "10px"
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    height: "100%"
  },
  buttonRight: {
    float: "right",
    marginRight: "5px",
    marginBottom: "10px"
  },
  FormPostButtons: {
    paddingBottom: "10px"
  }
}));

const deleteQuestion = (id,Department) => {
  const forumQuestionRef = firestore.collection(`Forum/${Department}/Questions`);
  forumQuestionRef
    .doc(id)
    .delete()
    .then(() => {
      console.log("Deleted Successfully");
    })
    .catch(error => {
      console.log(error);
    });
};
const ForumPost = props => {
  const classes = useStyles();
  const { questionDetails, id, studentID, updateState,Department } = props;

  const { Author, Text, Year } = questionDetails;
  const studentQuestionID = questionDetails.id;

  const condition = studentID === studentQuestionID;
  return (
    <Grid item xs={11} className={classes.grid}>
      <Paper className={classes.paper}>
        <Typography variant="h6">{Text}</Typography>
        <Typography variant="h8">
          by {Author} (Year {Year})
        </Typography>

        <AnswerQuestionModal id={id} />
        <Link to={`/home/viewanswers/${id}`}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonRight}
            size="small"
          >
            View Answers
          </Button>
        </Link>
        {condition ? (
          <Button
            variant="contained"
            color="secondary"
            className={classes.buttonRight}
            size="small"
            onClick={() => {
              deleteQuestion(id,Department);
              updateState();
            }}
          >
            Delete Question
          </Button>
        ) : null}
      </Paper>
    </Grid>
  );
};

export default ForumPost;
