import "dotenv/config";
import express from "express";
import path from "path";
import http from "http";
import socketio from "socket.io";
import { gameState } from "./controller/gameController";

const app = express();
const port = process.env.PORT || 3333;
const server = http.createServer(app);
const io = new socketio.Server(server);
const gameController = gameState;
app.use(express.static(path.join(__dirname, "./public/")));

gameController.addPlayer("socket.id");
// io events

io.on("connection", (socket: any) => {
  console.log(gameController.addPlayer(socket.id));

  const data = {
    players: gameController.players,
    fruits: gameController.fruits
  };

  socket.emit("newPlayer", data);

  function move(x: number, y: number, idx: any) {
    gameController.players[idx].x = x;
    gameController.players[idx].y = y;
    const data = {
      players: gameController.players,
      fruits: gameController.fruits
    };
    socket.broadcast.emit("updateState", data);
  }

  socket.on("movePlayer", (xPos: number, yPos: number, id: string) => {
    move(xPos, yPos, gameController.findPlayer(id));
  });
});
server.listen(port, () => {
  console.log(`listening in ${port} \n}`);
});
