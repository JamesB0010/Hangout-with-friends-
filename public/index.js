//add code to be able to connect to socket server
const socket = io();

var canvas = document.getElementById("myCanvas");
canvas.width = innerWidth -20;
canvas.height = innerHeight * 0.75;

var ctx = canvas.getContext('2d');

var player = new Player("New Player", "#000000", 10, 150, 150, "#ff0000", 2, {x:0,y:0}, {x:0,y:0});

var upInterval = 10;
var mouseDown = false;
let rect = canvas.getBoundingClientRect()

addEventListener("mousedown", event => {
  if (!(event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.top && event.clientY < rect.bottom)){
    return
  }
  mouseDown = true;
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  player.direction.x = x - player.x;
  player.direction.y = y - player.y;
}, true);

addEventListener("mouseup", event =>{
  player.direction.x = 0;
  player.direction.y = 0;
  mouseDown = false;
})

addEventListener("mousemove", event =>{
  if (!mouseDown){
    return;
  }
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  player.direction.x = x - player.x;
  player.direction.y = y - player.y;
})

canvas.addEventListener("touchstart", event =>{
  //thank you stack overflow for this little snippet!
  let evt = (typeof event.originalEvent === "undefined") ? event : event.originalEvent;
  let touch = evt.touches[0] || evt.changedTouches[0];

  console.log(touch.pageX);
  mouseDown = true;
  let x = touch.pageX
  let y = touch.pageY
  player.direction.x = x - player.x;
  player.direction.y = y - player.y;
})

canvas.addEventListener("touchmove", event =>{
  let evt = (typeof event.originalEvent === "undefined") ? event : event.originalEvent;
  let touch = evt.touches[0] || evt.changedTouches[0];

  let x = touch.pageX
  let y = touch.pageY
  player.direction.x = x - player.x;
  player.direction.y = y - player.y;
})

canvas.addEventListener("touchend", event =>{
  player.direction.x = 0;
  player.direction.y = 0;
})

var nameInput = document.getElementById("nameInp");

function updateName (){
  if (!nameInput.value){
    return;
  }
  player.name = nameInput.value;
}

var colorInput = document.getElementById("PColor");

colorInput.addEventListener("input", () => {
  player.color = event.target.value;
});

var nameColor = document.getElementById("PNameColor");

nameColor.addEventListener("input", () => {
  player.nameColor = event.target.value;
})


function render(){
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0,0,canvas.width,canvas.height);
  player.render();
}

function update(){
  render();
  player.update();
  socket.emit("update", player, socket.id);
  for (var key in ids){
    ids[key].render()
  }

  delete ids[null];
}

setInterval(update, upInterval);

var ids = {};


socket.on("render player", (otherPlayer, id) => {
  let foreignPlayer = new Player(otherPlayer.name, otherPlayer.nameColor, otherPlayer.size, otherPlayer.x, otherPlayer.y, otherPlayer.color, otherPlayer.speed, otherPlayer.velocity, otherPlayer.direction);


  ids[id] = foreignPlayer;
  foreignPlayer.render();
});

socket.on("remove player", playerId => {
  delete ids[playerId];
});
