import React from "react";
import "./profile.styles.scss";
import ImageAvatar from "../image-avatar/image-avatar.component";
import { Divider } from "@material-ui/core";
import ProfileSecondaryContent from "../profile-secondary-content/profile-secondary-content.component";
import {connect} from "react-redux";

class  Profile extends React.Component{

  componentDidMount(){
    
  }

  render(){
    
    const {currentUser} = this.props;
    
    return (
      <div className="container">
        <div className="person-content-container">
          <div className="person-content">
            <div className="avatar">
              <ImageAvatar />
            </div>
            <div className="person-details">
              <ul>
                <li>{(currentUser)? (currentUser.Name) :"Loading.."}</li>
                <li>{(currentUser)? (currentUser["Registration Number"]) :"Loading.."}</li>
                <li>{(currentUser)? (`Section :${currentUser["SectionID"]}`) :"Loading.."}</li>
                <li>{(currentUser)? (`Year : ${currentUser["Year"]}`) :"Loading.."}</li>
              </ul>
            </div>
          </div>
        </div>
        <Divider />
        <ProfileSecondaryContent />
      </div>
    );
  }
  
};

const mapStateToProps=state =>({
  currentUser : state.user.currentUser
});

export default connect(mapStateToProps)(Profile);
