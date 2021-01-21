import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../assets/images/download.png";
const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 130,
    height: 130
  }
});

export default function ImageAvatars() {
  const classes = useStyles();

  return <Avatar alt="Remy Sharp" src={avatar} className={classes.bigAvatar} />;
}
