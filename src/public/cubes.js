console.log("cubes script ready");
const screen = document.getElementById("screen");
const context = screen.getContext("2d");
let idList = 1;
let conter = document.getElementById("cont");
let fruitsCont = 0;

const game = {
  players: [],
  fruits: []
};

const url = window.location.href;
const socket = io(url);

socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("updateState", data => {
  upLocalState(data);
});

socket.on("newPlayer", data => {
  upLocalState(data);
  console.log(`game state loaded ${data.players[0]}`);
  renderGame();
});

function upLocalState(data) {
  game.players = data.players;
  game.fruits = data.fruits;
}

function emitMove(x, y, id) {
  console.log(`'emit move_func log: ${id} `);
  socket.emit("movePlayer", x, y, id);
}

function findMe(yourId) {
  for (let index = 0; index < game.players.length; index++) {
    const element = game.players[index];
    if (element.id == yourId) {
      return index;
    }
  }
}
//local code
document.addEventListener("keydown", inputMoves);
function inputMoves(event) {
  const keyPressed = event.key;
  //console.log(keyPressed)

  const readMoves = {
    ArrowUp(player) {
      //console.log('up')
      if (player.y - 1 >= 0) {
        player.y -= 1;
        emitMove(player.x, player.y, socket.id);
      }
    },
    ArrowDown(player) {
      //console.log('down')
      if (player.y + 1 < screen.height) {
        player.y += 1;
        emitMove(player.x, player.y, socket.id);
      }
    },
    ArrowLeft(player) {
      //console.log('left')
      if (player.x - 1 >= 0) {
        player.x -= 1;
        emitMove(player.x, player.y, socket.id);
      }
    },
    ArrowRight(player) {
      //console.log('right')
      if (player.x + 1 < screen.width) {
        player.x += 1;
        emitMove(player.x, player.y, socket.id);
      }
    }
  };

  const player = game.players[findMe(socket.id)];
  const moveCall = readMoves[keyPressed];
  if (moveCall) {
    moveCall(player);
  }
}

function addPoints() {
  conter.innerText = `Fruits: ${fruitsCont}`;
}

// local code
renderGame();
function renderGame() {
  context.fillStyle = "white";
  context.clearRect(0, 0, screen.width, screen.height);

  game.players.forEach(player => {
    if (player.id == socket.id) {
      context.fillStyle = "black";
    } else {
      context.fillStyle = player.color;
    }
    context.fillRect(player.x, player.y, 1, 1);
  });
  game.fruits.forEach(fruit => {
    context.fillStyle = "green";
    context.fillRect(fruit.x, fruit.y, 1, 1);
  });

  requestAnimationFrame(renderGame);
}
