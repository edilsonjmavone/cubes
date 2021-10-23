export const gameState: any = {
  players: [],
  fruits: [],
  points: 0,

  initGame() {
    // initialize the game base state on sever start
    this.createFruit();
  },

  createFruit() {
    // creates a fruit_obj
    this.fruits.push(
      new Fruit(this.randomNum(29), this.randomNum(19), "green")
    );
  },

  deleteFruit(fndx: any) {
    // "DELETES" fruit obj and then creates new one in random position
    this.fruits.splice(fndx, 1);
  },

  addPlayer(id: string) {
    // creates new player obj
    gameState.players.push(
      new Player(id, this.randomNum(29), this.randomNum(19), "gray")
    );
    console.log("new player in the game");
    return this.players;
  },

  removePlayer(objId: any) {
    // removes player obj
    this.players.splice(objId, 1);
    console.log(`REMOVE player log:${this.players}`);
  },

  randomNum(e: number) {
    return Math.floor(Math.random() * e + 1);
  },

  findObj(id: string, obj: any) {
    //finds obj index in the array
    let index = -1;
    let key;
    obj.forEach((element: any) => {
      index++;
      console.log(`\nfindObj func log: ID:${element.id} ARRAY_INDEX:${index}`);
      if (element.id == id) {
        console.log(`findObj func match log: ${index} is it's id`);
        key = index;
      }
    });
    console.log(`findObj log ${key}`);
    return key;
  },

  move(x: number, y: number, id: string) {
    // changes player  X and Y
    let indx = this.findObj(id, this.players);
    console.log(`obj move_func log : \n X:${x} \n Y:${y} \n ID:${indx}`);
    try {
      this.players[indx].x = x;
      this.players[indx].y = y;
      this.colide();
      console.log(`GREATTTTTT!!!!`);
    } catch (error) {
      console.log(`MOVE METHOD  log:${indx}`);
    }
  },

  colide() {
    // cheack colision event
    let findx = -1;
    this.players.forEach((player: any) => {
      this.fruits.forEach((fruit: any) => {
        findx++;
        if (fruit.y == player.y && fruit.x == player.x) {
          console.log(
            `${player.id} colided with fruit index:${findx} at:x${fruit.x},y ${fruit.y}`
          );
          this.deleteFruit(findx); // for some reason is not coliding
        }
      });
    });
  }
};

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
