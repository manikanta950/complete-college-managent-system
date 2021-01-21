import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import {logoutUser} from "../../redux/logout/logout.action";
import {auth} from "../../firebase/firebase.utils";

const styles  = theme => ({
  appBar: {
    width: `calc(100%-240)`,
    marginLeft: "240px",
    textAlign: "right",
    backgroundColor:"#00796b"
  },
  toolbar: theme.mixins.toolbar,

  textalign: {
    flexgrow: 1,
    width: "100%",
    textAlign: "right"
  },

  button:
  {
    color:"secondary",
    left:"100%"
  },
  logout:{
    padding:"0px 10px",
    
  }
});

class Navbar extends React.Component {
  render(){
    const {classes} = this.props
    const {logoutUser} = this.props;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.textalign} align="center">
            
            </Typography>
          <Typography variant="h6" className={classes.textalign} align="right">
            
          </Typography>
          <Button variant="contained" onClick={()=>{
            logoutUser();
            console.log("logging out")
            auth.signOut();
            }}>
            <Typography variant="subtitle2" className={classes.logout}>Logout</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
  
  
}
const mapDispatchToProps = dispatch => ({
  logoutUser :()=> dispatch(logoutUser())
})
export default connect(null,mapDispatchToProps)(withStyles(styles)(Navbar));