import React from "react";
import "./Input.css";
import VoiceRec from "../VoiceRec/VoiceRec";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="send-button" onClick={(event) => sendMessage(event)}>
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
    <VoiceRec setMessage={setMessage} />
  </form>
);

export default Input;
