import React from "react";
import Typography from "@material-ui/core/Typography";
// import CustomizedInputBase from "./searchbar"
import ForumAnswers from "../forum-view-answers-grid/forum-view-answers-grid.component";
import { firestore } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
class ViewAnswers extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      forumAnswerArray: [],
      questionText: null,
      Author: null
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    const id = this.props.match.params.id;
    this.setState({ id: id });
    let forumAnswerArray = [];
    const { Department } = this.props.currentUser;

    const answersRef = firestore.collection(
      `Forum/${Department}/Answers/${id}/answers`
    );
    answersRef
      .get()
      .then(snapshot => {
        console.log(snapshot);
        snapshot.forEach(doc => {
          console.log(doc.data());

          forumAnswerArray.push({ [doc.id]: doc.data() });
        });

        this.setState({ forumAnswerArray: forumAnswerArray });
        console.log(forumAnswerArray);
      })
      .catch(error => {
        console.log(error);
      });

    const forumQuestionRef = firestore.doc(
      `Forum/${Department}/Questions/${id}`
    );

    forumQuestionRef
      .get()
      .then(doc => {
        console.log(doc.data());
        const { Author, Text } = doc.data();
        this.setState({ Author: Author, questionText: Text });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const { id, Author, questionText } = this.state;
    console.log("mounting answers");
    const { forumAnswerArray } = this.state;
    return (
      <div>
        {/* <CustomizedInputBase/> */}

        <Typography variant="h5">{questionText}</Typography>
        <Typography variant="h8">By {Author}</Typography>
        <ForumAnswers id={id} forumAnswerArray={forumAnswerArray} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(ViewAnswers);
