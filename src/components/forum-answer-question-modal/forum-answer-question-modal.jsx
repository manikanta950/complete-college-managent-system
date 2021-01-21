import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import {connect} from "react-redux";

import {firestore} from "../../firebase/firebase.utils.js";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});
const stylesText =theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "90%"
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  width: {
    width: "300px"
  },
  buttonRight: {
    float: "right",
    marginRight: "5px"
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: "400px"
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

class AnswerQuestionModal extends React.Component {
  constructor(){
    super();

    this.state={
      dialog:false,
      answerText:null
    }
  }



  handleClickOpen=()=> {
    //   const [open, setOpen] = React.useState(false);
    //  setOpen(true);
    this.setState({dialog:true});
    };

    handleClose= () =>{
      // const [open, setOpen] = React.useState(false);
      // setOpen(false);
    
      
      this.setState({dialog:false});
      
    };

    handleCloseSubmit = () => {
      const {id,Author,Department,Semester,Year} = this.props;

      const answerRefDoc = firestore.collection(`Forum/${Department}/Answers/${id}/answers`).doc();
      console.log(Year);
      answerRefDoc.set({
        Author:Author,
        Text:this.state.answerText,
        Semester:Semester,
        Year:Year
      }).then(()=>{
        
        this.setState({dialog:false});
      })
    }
    

    textOnChange = event =>{
      event.preventDefault();
      console.log(event.target.value);
      this.setState({answerText:event.target.value});
    }
    render(){
      const {classes} = this.props;
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}
            className={classes.buttonRight}
            size="small"
          >
            Answer Question
          </Button>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.dialog}
          >
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              Answer Question
            </DialogTitle>
            <DialogContent dividers>
              <TextField
                id="filled-multiline-static"
                label=""
                multiline
                rows="5"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                variant="filled"
                onChange={this.textOnChange}
              value={this.state.questionText}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseSubmit} color="primary">
                Answer Question
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  
}

const mapStatetoProps = state =>({
  Author : state.user.currentUser.Name,
  Department: state.user.currentUser.Department,
  Semester : state.user.currentUser.Semester,
  Year:state.user.currentUser.Year
})

export default connect(mapStatetoProps)(withStyles(stylesText)(AnswerQuestionModal));