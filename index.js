const cv = require("opencv4nodejs");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");

const videoCapture = new cv.VideoCapture(0);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "app.html"));
});

setInterval(() => {
  const frame = videoCapture.read();
  const image = cv.imencode(".jpg", frame).toString("base64");
  io.emit("stream", image);
}, 100);

server.listen(80);
