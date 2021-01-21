import React from "react";
import ForumList from "../forum-list/forum-list.component";
import Typography from "@material-ui/core/Typography";

import AddPostModal from "../forum-add-post-modal/forum-add-post-modal.component";
import "./forum.styles.scss";
import ForumSearchBar from "../forum-search-bar/forum-search-bar.component";
import { connect } from "react-redux";
import { firestore } from "../../firebase/firebase.utils";


class Forum extends React.Component {
  constructor() {
    super();
    this.state = {
      questionArray: [],
      updateState: "no",
      searchText: ""
    };
  }

  updateState = () => {
    this.setState({ updateState: "updated" });
    console.log("updated");
    this.getQuestionArray();
  };

  searchText = searchText => {
    this.setState({ searchText: searchText }, () => {
      this.getQuestionArray();
    });
    console.log("searching takes place.............");
  };

  getQuestionArray = () => {
    const { Department } = this.props.currentUser;
    const searchText = this.state.searchText;

    console.log("aekfhdkabfkhsdbkhfbkdsbfbasmdnfbhsdbfmsbdhm");
    console.log(this.state);
    const forumQuestionsRef = firestore.collection(
      `Forum/${Department}/Questions`
    );
    let questionArray = [];
    forumQuestionsRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        const id = doc.id;
        const data = doc.data();

        const text = data.Text;
        const string = String(text);
        console.log(searchText);
        console.log(string.includes(searchText));
        if (text) {
          if (text.includes(searchText)) {
            questionArray.push({ [id]: data });
          }
        }
      });

      console.log(questionArray);
      this.setState({ questionArray: questionArray });
    });
  };
  componentDidMount() {
    this.getQuestionArray();
  }

  render() {
    const { Department, id } = this.props.currentUser;
    console.log(Department);
    const { questionArray } = this.state;
    console.log(this.state);

    return (
      <div className="forum-wrap">
        <Typography variant="h3">Forum</Typography>
        <Typography variant="h7">of {Department}</Typography>
        <ForumSearchBar searchText={this.searchText} />
        <div className="forum-container">
          <ForumList
            questionArray={questionArray}
            studentID={id}
            updateState={this.updateState}
            Department = {Department}
          />
          <div className="forum-buttons">
            <AddPostModal updateState={this.updateState} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Forum);
