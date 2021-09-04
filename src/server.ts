import "dotenv/config"
import express from "express"
import path from "path"
import http from "http"
import socketio from "socket.io"

const app = express()
const port = process.env.PORT || 3333
const server = http.createServer(app)
const io = new socketio.Server(server)

app.use(express.static(path.join(__dirname,"./public/")))

// io events

io.on("connection", (socket: any) => {
    console.log(`conected socket id:${socket.id}`);
    
    
})

server.listen(port, ()=>{
    console.log(`listening in ${port}`);
    
})