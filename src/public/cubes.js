console.log("cubes project")
  const screen = document.getElementById('screen')
  const context = screen.getContext('2d')
  let idList = 1
  let conter = document.getElementById("cont")
  let fruitsCont = 0

 const game ={
   players:{
     "player1":{x: 1, y: 3, color: "black"}
   },
   fruits:{
     "fruit1":{x: 5, y: 7}
   }
 }


 document.addEventListener('keydown', inputMoves)
function inputMoves(event) {
  const keyPressed = event.key
  //console.log(keyPressed)

  const readMoves = {
    ArrowUp(player) {
      //console.log('up')
      if (player.y - 1 >= 0) {
        player.y -= 1
      }
    },
    ArrowDown(player) {
      //console.log('down')
      if (player.y + 1 < screen.height) {
        player.y += 1
      }

    },
    ArrowLeft(player) {
      //console.log('left')
      if (player.x - 1 >= 0) {
        player.x -= 1
      }

    },
    ArrowRight(player) {
      //console.log('right')
      if (player.x + 1 < screen.width) {
        player.x += 1
      }

    }
  }

  const player = game.players['player1']
  const moveCall = readMoves[keyPressed]
  if (moveCall) {
  moveCall(player)
  colide()
  }

  function colide() {
    for ( const fruitId in game.fruits){
       const fruitstt = game.fruits[fruitId]
       if (fruitstt.y == player.y && fruitstt.x == player.x){
          console.log(`player1 colide ${fruitId} `)
          deleteObjs(fruitId)
       }

    }
  }
   
}
function deleteObjs(objId){
  delete game.fruits[objId]
   fruitsCont += 1
   addPoints()
  console.log(`object deleted`) 
 
  createFruit()  

    function createFruit(){
    game.fruits["fruit" + idList] = { x: randomNum(29), y: randomNum(19)}

    console.log("new fruit in the game")
  }

   function addPoints(){
    conter.innerHTML = `Fruits: ${fruitsCont}`
   } 


}
 function randomNum(e) {
    return Math.floor(Math.random() * e + 1)
  }





renderGame()
function renderGame(){
  context.fillStyle = 'white'
  context.clearRect(0, 0, screen.width, screen.height)

  for ( const playerId in game.players){
    const player = game.players[playerId]
    context.fillStyle = player.color
    context.fillRect(player.x, player.y, 1, 1 )
  }

  for (const fruitId in game.fruits){
    const fruit = game.fruits[fruitId]
    context.fillStyle = "green"
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  requestAnimationFrame(renderGame)
}


