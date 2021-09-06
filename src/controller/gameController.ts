export const gameState: any = {
  players: [],
  fruits: [],

  createFruit() {
    this.fruits.push(
      new Fruit(this.randomNum(29), this.randomNum(19), "green")
    );
  },

  deleteFruit() {
    delete gameState.fruit[0];
    this.createFruit();
  },

  addPlayer(id: string) {
    gameState.players.push(
      new Player(id, this.randomNum(29), this.randomNum(19), "black")
    );
    console.log("new player in the game");
    return this.players;
  },

  removePlayer(objId: any) {
    gameState.players.forEach((element: any, index: any) => {
      if (element.id === objId) {
        delete gameState.players[index];
      }
    });
    console.log(`object deleted`);
  },

  randomNum(e: number) {
    return Math.floor(Math.random() * e + 1);
  },

  findPlayer(id: string) {
    for (let index = 0; index < this.players.length; index++) {
      const element = this.players[index];
      if (element.id === id) {
        return index;
      }
    }
  }
};

//const idList = "1";

class Player {
  id: string;
  x: number;
  y: number;
  color: string;

  constructor(id: string, xPOs: number, yPos: number, color: string) {
    this.x = xPOs;
    this.y = yPos;
    this.color = color;
    this.id = id;
  }
}
class Fruit {
  x: number;
  y: number;
  color: string;

  constructor(xPOs: number, yPos: number, color: string) {
    this.x = xPOs;
    this.y = yPos;
    this.color = color;
  }
}

// delete method doesn't work

/**
 * 
 * 
 function colide() {
   for (const fruitId in game.fruits) {
     const fruitstt = game.fruits[fruitId];
     if (fruitstt.y == player.y && fruitstt.x == player.x) {
       console.log(`player1 colide ${fruitId}`);
       deleteObjs(fruitId);
     }
   }
 }
 *
 *
 */
