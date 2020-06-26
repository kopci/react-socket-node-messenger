import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faRobot,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [toRoomName, setToRoomName] = useState(false);
  const [toConfirm, setToConfirm] = useState(false);

  const keyPress = (e) => {
    e.keyCode === 13 && setToRoomName(true);
    e.keyCode === 13 && toRoomName && setToConfirm(true);
  };

  return (
    <div className="outer-space">
      <div className="signin-form">
        <header>
          <h1>Sign In</h1>
          <p>Please enter your name and room name.</p>
          <div></div>
        </header>
        <form>
          <div
            className={
              toRoomName
                ? "input-section email-section fold-up"
                : "input-section email-section"
            }
          >
            <input
              className="email"
              placeholder="Enter your name..."
              autoComplete="off"
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => keyPress(event)}
            />
            <div
              className="animated-button"
              onClick={name ? (event) => setToRoomName(true) : null}
            >
              <span
                className={
                  name
                    ? "icon-paper-plane next-button next"
                    : "icon-paper-plane next-button"
                }
              >
                <FontAwesomeIcon icon={faRobot} />
              </span>
              <span className="next-button email">
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
            </div>
          </div>
          <div
            className={
              toRoomName
                ? "input-section password-section"
                : "input-section password-section folded"
            }
          >
            <input
              className="password"
              placeholder="Enter name of room..."
              onChange={(event) => setRoom(event.target.value)}
              onKeyDown={(event) => keyPress(event)}
            />
            <div
              className="animated-button"
              onClick={name ? (event) => setToConfirm(true) : null}
            >
              <span
                className={
                  room ? "icon-lock next-button next" : "icon-lock next-button"
                }
              >
                <FontAwesomeIcon icon={faDoorOpen} />
              </span>
              <span className="next-button password">
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
            </div>
          </div>
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <div className={toConfirm ? "signin show-signin" : "signin"}>
              <p>SIGN IN</p>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
