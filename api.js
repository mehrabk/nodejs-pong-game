const express = require("express")
const path = require("path")

const apiServer = express()

apiServer.use(express.static(path.join(__dirname, "public")))
apiServer.use("/", express.static("index.html"))
apiServer.use("/mehrab", (req, res) => {
  console.log(req)
  return res.json({
    salam: "mehrabam"
  })
})

module.exports = apiServer
