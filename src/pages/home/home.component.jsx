import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "../../components/navbar/navbar.component"
import Maincontent from "../../components/main-content/main-content.component";
import Sidebar from "../../components/side-drawer/side-drawer.component";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        <Sidebar />
        <Maincontent />
      </div>
    </div>
  );
}
