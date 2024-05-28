import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'

dotenv.config({
    path: "./.env"
})

const server = createServer(app)
const io = new Server(server , {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
        }
})

const roomCreators = {}

connectDB()
.then( () => {
    app.on("error" , (error) => {
        console.log("Errror: ", error);
        throw error
    })

    io.on('connection',(socket) => {

        socket.on('createRoom',(roomCode) => {
            socket.join(roomCode)
            roomCreators[roomCode] = socket.id
            console.log(`Room created: ${roomCode} by ${socket.id}`)
        })

        socket.on('joinRoom',(roomCode) => {
            socket.join(roomCode)
            socket.to(roomCode).emit('message','A new user has joined the room.')
            console.log(`User joined room: ${roomCode}`)
        })

        socket.on('chatMessage',({roomCode , message}) => {
            io.to(roomCode).emit('message', message)
            console.log(`Message sent to room ${roomCode}: ${message}`)
        })

        socket.on('leaveRoom',() => {
            console.log("User disconnected");

            for(const [roomCode , creatorId] of Object.entries(roomCreators)) {
    
                if(creatorId === socket.id) {
                io.to(roomCode).emit('message' , 'The room creator has left. The room will be closed')
                io.socketsLeave(roomCode)
                delete roomCreators[roomCode]
                console.log(`Room destroyed: ${roomCode}`)
                }
            }
        })
    })



    server.listen(process.env.PORT || 8000 , () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    })
})
.catch( ( err ) => {
    console.log("MongoDb connection failed !!!", err)
})
