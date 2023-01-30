import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/api",
});

app.get("/api/status", (req, res) => {
  res.send({ status: "ok" });
});

io.on("connection", (socket) => {
  setInterval(() => {
    socket.emit("message", `Hello ${socket.client}`);
  }, 1000);
  console.log("a user connected");
});

setInterval(() => {
  io.emit("message", "Hello everyone");
}, 1000);

server.listen(5000, () => {
  console.log("listening on *:5000");
});
