let readyPlayerCount = 0

function listen(io) {
  console.log("listening socket.io...")
  const pongNamespace = io.of("/pong")

  pongNamespace.on("connection", socket => {
    let room = "room" + Math.floor(readyPlayerCount / 2)
    console.log("a user connected", socket.id)

    socket.on("ready", () => {
      socket.join(room)
      console.log(`Player ready room = ${room}`, socket.id)
      readyPlayerCount++
      if (readyPlayerCount % 2 === 0) {
        // broadcast (for all player)
        // pongNamespace.emit("startGame", socket.id)
        pongNamespace.in(room).emit("startGame", socket.id)
      }
    })

    socket.on("paddleMove", paddleData => {
      socket.to(room).emit("paddleMove", paddleData)
    })

    socket.on("ballMove", ballData => {
      socket.to(room).emit("ballMove", ballData)
    })

    socket.on("disconnect", reason => {
      console.log(`Clinet ${socket.id} Disconnected: ${reason}`)
      socket.leave(room)
    })
  })
}

module.exports = {
  listen
}
