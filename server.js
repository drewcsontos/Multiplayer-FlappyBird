let Pipe = require("./pipe.js");
// Dependencies
let express = require("express");
let http = require("http");
let path = require("path");
let socketIO = require("socket.io");
let app = express();
let server = http.Server(app);
let io = socketIO(server);
app.set("port", 5000);
app.use("/static", express.static(__dirname + "/static"));
// Routing
app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "index.html"));
});
// Starts the server.
server.listen(5000, function () {
  console.log("Starting server on port 5000");
});
let players = {};
let pipes = [new Pipe(500), new Pipe(900)];
io.on("connection", function (socket) {
  socket.on("new player", function (name) {
    players[socket.id] = {
      x: 100,
      y: 300,
      speed: -10,
      up: false,
      score: 0,
      invincibility_time: 180,
      name: name,
    };
    socket.on("disconnect", function () {
      delete players[socket.id];
    });
  });

  socket.on("movement", function (data) {
    let player = players[socket.id] || {};
    if (data.up && player.speed < -10) player.speed = 150;
  });
});
setInterval(function () {
  if (!(Object.keys(players).length === 0))
    for (let key in players) {
      players[key].y -= players[key].speed / 20;
      if (players[key].speed > -60) players[key].speed -= 5;
      players[key].score += 1;
    }
  pipes[0].update();
  pipes[1].update();
  io.sockets.emit("game", players, pipes);
}, 1000 / 60);
