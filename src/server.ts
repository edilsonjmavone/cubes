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
gameController.initGame();
app.use(express.static(path.join(__dirname, "./public/")));

// io events

io.on("connection", (socket: any) => {
  console.log(gameController.addPlayer(socket.id));
  sendUpdate();

  const data = {
    players: gameController.players,
    fruits: gameController.fruits
  };

  socket.emit("newPlayer", data);

  socket.on("update", sendUpdate);

  socket.on("movePlayer", (xPos: number, yPos: number, id: string) => {
    console.clear();
    console.log(
      `
      <===================================>
      \n Player with ID"${id}" 
       moving to X:${xPos} and Y:${yPos} \n
      <===================================>
      `
    );
    gameController.move(xPos, yPos, id);
    sendUpdate();
  });

  socket.on("disconnect", () => {
    gameController.removePlayer(socket.id);
    sendUpdate();
  });

  function sendUpdate() {
    const d = {
      players: gameController.players,
      fruits: gameController.fruits
    };

    socket.broadcast.emit("updateState", d);
  }
});
server.listen(port, () => {
  console.log(`listening in ${port} \n}`);
});
