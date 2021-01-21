import React from "react";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "auto"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
});

class ForumSearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      searchText: ""
    };
  }
  onTextChange = event => {
    event.preventDefault();

    const searchText = event.target.value;
    console.log(searchText);
    this.setState({ searchText: searchText });
  };
  render() {
    const { classes } = this.props;
    const { searchText } = this.props;
    console.log(searchText);
    return (
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search Forum"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={event => {
            event.preventDefault();
            console.log(event.target.value);
            this.onTextChange(event);
            searchText(event.target.value);
          }}
        />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default withStyles(styles)(ForumSearchBar);
