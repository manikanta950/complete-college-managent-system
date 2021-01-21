import React from "react";

import { Switch,Route,Redirect } from "react-router-dom";
import Home from "./pages/home/home.component";
import SignIn from "./pages/sign-in/sign-in.component";

import {auth} from "./firebase/firebase.utils";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.action"
import {firestore} from "./firebase/firebase.utils";

class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
       console.log("auth");
      if(userAuth){
        const userRef =  firestore.doc(`Students/${userAuth.uid}`);

        userRef.onSnapshot(snapShot=>{
          console.log(snapShot);
           setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          })
        })

        

        
      }else{
        setCurrentUser(userAuth);
      }
    });

    
  }
  render() {

    return (
      <div className="app-container">
      <Switch>
      <Route exact path="/" render = {()=> (<Redirect to="/login"></Redirect>)}></Route>
      <Route path="/login" render={()=> this.props.currentUser ? (<Redirect to="/home/profile" />):(<SignIn />)}></Route>
      <Route  path="/home" render={()=> !this.props.currentUser ? (<Redirect to="/login" />):(<Home />)}></Route>
       
      </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  setCurrentUser : user=>dispatch(setCurrentUser(user))
})

const mapStateToProps = state =>({
  currentUser:state.user.currentUser
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
