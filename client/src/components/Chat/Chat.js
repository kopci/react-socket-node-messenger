import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search); // transform URL params into object

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) alert(error);
    });

    return () => {
      // to finish a useEffect hook, u need to use render (to unmount)
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]); // if endpoint or location changes - activate effect

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]); // add new message to messages array
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault(); // prevents default page refresh on keypress/click ()
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
    console.log("sending message");
  };

  console.log(message, messages);

  return (
    <div className="outer-chat-space">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
