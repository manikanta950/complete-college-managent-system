import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import logo from "../../assets/images/amrita_logo.jpg";

import {auth} from "../../firebase/firebase.utils";
import "./sign-in.styles.scss"

// const useStyles = makeStyles(theme => ({
//   "@global": {
//     body: {
//       backgroundColor: theme.palette.common.white
//     }
//   },
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center"
//   },

//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   },
//   image: {
//     height: "100px"
//   }
// }));


class SignIn extends React.Component {

  constructor(){
    super();

    this.state={
      email:'',
      password:'',
      loginClick:false,
      errorMessage:''
      
    }
  }

  

  componentDidMount(){
    
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {email,password} = this.state;
    console.log(email,password);
    try{
      await auth.signInWithEmailAndPassword(email,password);
      this.setState({email:'',password:''});
    }catch (error){
      console.log(error);
      this.setState({errorMessage:error.code})
      
    }
    this.setState({loginClick:false})
  }
  handleChange = (event) =>{
    event.preventDefault();

    const {value,name}=event.target;
    console.log(value,name)
    this.setState({
      [name]:value
    })
  }

  errorClassifer = errorMessage => {
    switch(errorMessage){
      case 'auth/user-not-found':
        return "User not found. Try again."
      case 'auth/wrong-password':
        return "Wrong Password. Enter Correct Password."
      
      default:
        return "Error"
    }
  }
  
  render(){
    
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="body"
    >
      <CssBaseline />
      <div className="paper">
        <img src={logo} className="image" alt="Engineering"></img>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="form" noValidate onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={this.state.email}
            autoFocus
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick = {()=>{this.setState({loginClick:true});
            console.log("login started")
            console.log(this.state)}}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item></Grid>
          </Grid>
        </form>
        <p>{(this.state.loginClick) ? "Logging you in...":null}</p>
        <p className="error">{(this.state.errorMessage)? (this.errorClassifer(this.state.errorMessage)) : null}</p>
      </div>
    </Container>
  );
}
}
export default (SignIn);