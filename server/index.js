const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router"); // my router

const app = express();
const server = http.createServer(app);
const io = socketio(server);

/**
 * In this "on" handler we are managing specific socket (that arrived as a param)
 */
io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    // callback triggers a response, in this case error
    if (error) return callback(error);

    // if user correctly join the room, show him this message
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}.`,
    });
    // broadcast following to all the other users in room
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined!`,
    });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: user.name,
        text: message,
      });
    }

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `User ${user.name} has left.`,
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
