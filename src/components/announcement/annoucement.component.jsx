import React from "react";
import Typography from "@material-ui/core/Typography";
import AnnoucementList from "../annoucement-list/annoucement-list.component";

const Announcement = () => {
  return (
    <div>
    <Typography variant="h4">Annoucements</Typography>
      <AnnoucementList />
    </div>
  );
};

export default Announcement;
