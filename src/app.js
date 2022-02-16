import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

const PORT = 3001
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(cors())

io.on('connection', socket => {
    console.log(socket)
})

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))