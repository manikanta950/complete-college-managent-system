import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import HomeIcon from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ForumIcon from "@material-ui/icons/Forum";
import WorkIcon from "@material-ui/icons/Work";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import ScheduleIcon from "@material-ui/icons/Schedule";
import {Link} from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,

  }));

export default function SideBar(){

    const classes = useStyles();

    return(
    <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />

          <Divider />
          <List>
            <Link to = '/home/profile'>
            <ListItem button key="Home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
            </Link>
            <Link to = '/home/forum'>
            <ListItem button key="Forum">
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText>Forum</ListItemText>
            </ListItem>
            </Link>
            <Link to = '/home/announcement'>
            <ListItem button key="Announcements">
              <ListItemIcon>
                <AnnouncementIcon />
              </ListItemIcon>
              <ListItemText>Announcements</ListItemText>
            </ListItem>
            </Link>
            <Link to = '/home/schedule'>
            <ListItem button keys="Schedules">
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText>Schedules</ListItemText>
            </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem button key="Placement">
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText>Placements</ListItemText>
            </ListItem>
            <ListItem button key="Cafeteria">
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText>Cafeteria</ListItemText>
            </ListItem>
          </List>
        </Drawer>
    );
}