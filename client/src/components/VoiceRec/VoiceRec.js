import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import "./VoiceRec.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const VoiceRec = ({ setMessage }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("stopped");
      };
    }

    mic.onstart = () => {
      console.log("start");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setMessage(transcript);
      console.log(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleVoiceRecClick = (event) => {
    event.preventDefault();
    setIsListening((prevState) => !prevState);
  };

  return (
    <button
      className={isListening ? "voice-rec recording" : "voice-rec"}
      onClick={handleVoiceRecClick}
    >
      <FontAwesomeIcon icon={faMicrophone} />
    </button>
  );
};

export default VoiceRec;
