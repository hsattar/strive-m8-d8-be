import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

const PORT = 3001
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(cors())
let onlineUsers = []

io.on('connection', socket => {
    
    socket.on('setUsername', ({ username }) => {
        onlineUsers.push({ username, id: socket.id })
        socket.emit('loggedin')
        socket.broadcast.emit('newConnection')
    })

    socket.on('sendMessage', (message) => {
        socket.broadcast.emit('message', message)
    })

    socket.on('disconnect', () => onlineUsers = onlineUsers.filter(user => user.id !== socket.id))

})

app.get('/online-users', (req, res) => res.send({ onlineUsers }))

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))