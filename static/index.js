// eslint-disable-next-line no-undef
let socket = io();
let x = document.getElementById("game");
let ctx = x.getContext("2d");
let background = document.getElementById("background");
let name = prompt("Type your name:");
if (name == null) name = "Anonymous";
/*let bird = null;
let pipe = null;
let pipe2 = null;
let score = 0;
function collides(a, b) {
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
  );
}
*/
let movement = { up: false };
document.addEventListener("keydown", function (event) {
  if (event.code == "KeyW" || event.code == "Space") movement.up = true;
}); /*
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  var lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (event) {
      var now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
  document.addEventListener(
    "touchmove",
    function (event) {
      event.preventDefault();
    },
    false
  );
  x.addEventListener("touchend", function () {
    if (bird.speed < 60) bird.speed = 120;
  });
} else*/
document.addEventListener("mousedown", function () {
  movement.up = true;
});
document.addEventListener("mouseup", function () {
  movement.up = false;
});
document.addEventListener("keyup", function (event) {
  if (event.code == "KeyW" || event.code == "Space") movement.up = false;
});

socket.emit("new player", name);
setInterval(function () {
  socket.emit("movement", movement);
}, 1000 / 60);

socket.on("game", function (players, pipes) {
  ctx.drawImage(background, 0, 0);
  let bottom = document.getElementById("pipe");
  let top = document.getElementById("pipe1");
  ctx.fillStyle = "green";
  pipes[0].ctx = ctx;
  pipes[1].ctx = ctx;
  ctx.drawImage(top, pipes[0].x, -200 + pipes[0].random, 100, 400);
  ctx.drawImage(bottom, pipes[0].x, pipes[0].random + 375, 100, 400);

  ctx.drawImage(top, pipes[1].x, -200 + pipes[1].random, 100, 400);
  ctx.drawImage(bottom, pipes[1].x, pipes[1].random + 375, 100, 400);
  for (let id in players) {
    let player = players[id];
    let image = document.getElementById("bird");
    ctx.drawImage(image, player.x, player.y, 51, 36);
    ctx.textAlign = "center";
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(player.score, player.x + 24, player.y + 60);
    ctx.fillText(player.name, player.x + 24, player.y - 20);
    let image1 = document.getElementById("front");
    ctx.drawImage(image1, 0, 600, 500, 150);
  }
});
