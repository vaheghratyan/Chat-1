import React from "react";
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import "./InfoBar.css";

const InfoBar = ({ room, photo }) => (
  <div className="header">
    <div className="headerInfo">
      <h3>{room}</h3>
    </div>

    <IconButton>
      <SearchOutlined />
    </IconButton>
    <IconButton>
      <AttachFile />
    </IconButton>
    <div>
      <img src={photo} alt="Profile" className="image" />
    </div>
  </div>
);

export default InfoBar;
