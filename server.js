const http = require("http")
const io = require("socket.io")
const apiServer = require("./api")
const httpServer = http.createServer(apiServer)
const socketServer = io(httpServer)

const sockets = require("./sockets")

const PORT = 3000
httpServer.listen(PORT)
console.log(`Listening on ${PORT} ...`)

sockets.listen(socketServer)

// httpServer integrated with express & socket.io and express handle http protocols and socket handle socket porotol
