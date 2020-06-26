import React from "react";
import "./InfoBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <FontAwesomeIcon icon={faTimes} color="white" />
      </a>
      {/* full refresh is not a good practice, but in this case its what we need to close chat */}
    </div>
  </div>
);

export default InfoBar;
