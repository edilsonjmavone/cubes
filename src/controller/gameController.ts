export const gameState: any = {
  players: {
    id: { x: 16, y: 6, color: "gray" }
  },
  fruits: {},
  points: 0,

  initGame() {
    // initialize the game base state on sever start
    this.createFruit();
  },

  createFruit() {
    // creates a fruit_obj
    let id = `fruit${this.randomNum(50)}`;
    this.fruits[id] = new Fruit(
      this.randomNum(29),
      this.randomNum(19),
      "green"
    );
  },

  addPlayer(id: string) {
    // creates new player obj
    this.players[id] = new Player(
      this.randomNum(29),
      this.randomNum(19),
      "gray"
    );
    console.log("new player in the game");
    return this.players;
  },

  deleteFruit(id: string) {
    // "DELETES" fruit obj and then creates new one in random position
    this.fruits[id].x = this.randomNum(29);
    this.fruits[id].y = this.randomNum(19);
    console.warn(`NEW fruit at x:${this.fruits[id].x}, y:${this.fruits[id].y}`);
  },

  removePlayer(id: string) {
    // removes player obj
    delete this.players[id];
    console.log(`REMOVE player log:${this.players}`);
  },

  randomNum(e: number) {
    return Math.floor(Math.random() * e + 1);
  },

  // findObj(id: string, obj: any) {
  //   //finds obj index in the array
  //   let index = -1;
  //   let key;
  //   obj.forEach((element: any) => {
  //     index++;
  //     console.log(`\nfindObj func log: ID:${element.id} ARRAY_INDEX:${index}`);
  //     if (element.id == id) {
  //       console.log(`findObj func match log: ${index} is it's id`);
  //       key = index;
  //     }
  //   });
  //   console.log(`findObj log ${key}`);
  //   return key;
  // },

  move(x: number, y: number, id: string) {
    // changes player  X and Y

    console.log(`obj move_func log : \n X:${x} \n Y:${y} \n ID:${id}`);
    try {
      this.players[id].x = x;
      this.players[id].y = y;
      this.colide();
      console.log(`GREATTTTTT!!!!`);
    } catch (error) {
      console.log(`MOVE METHOD  log:${id}`);
    }
  },

  colide() {
    // cheack colision event
    // let findx = -1;

    for (const playerID in this.players) {
      const player = this.players[playerID];
      for (const fruitID in this.fruits) {
        const fruit = this.fruits[fruitID];
        if (fruit.y == player.y && fruit.x == player.x) {
          console.log(
            `${playerID} colided with fruit index:${fruitID} at:x${fruit.x}, y${fruit.y}`
          );
          this.deleteFruit(fruitID); // for some reason is not coliding
        }
      }
    }
    // this.players.forEach((player: any) => {
    //   this.fruits.forEach((fruit: any) => {
    //     findx++;
    //     if (fruit.y == player.y && fruit.x == player.x) {
    //       console.log(
    //         `${player.id} colided with fruit index:${findx} at:x${fruit.x},y ${fruit.y}`
    //       );
    //       this.deleteFruit(findx); // for some reason is not coliding
    //     }
    //   });
    // });
  }
};

class Player {
  x: number;
  y: number;
  color: string;

  constructor(xPOs: number, yPos: number, color: string) {
    this.x = xPOs;
    this.y = yPos;
    this.color = color;
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
