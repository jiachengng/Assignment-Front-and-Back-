const express = require("express")
const app = express()
const sanitizeHTML = require("sanitize-html")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
dotenv.config({ path: "./config/config.env" })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cookieParser())

app.use("/", require("./router"))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server started on port ${process.env.PORT} in ${process.env.NODE_ENV}mode`)
})

const server = require("http").createServer(app)
const io = require("socket.io")(server, {
  pingTimeout: 30000,
  cors: true
})

io.on("connection", function (socket) {
  socket.on("chatFromBrowser", function (data) {
    try {
      let user = jwt.verify(data.token, process.env.JWTSECRET)
      socket.broadcast.emit("chatFromServer", { message: sanitizeHTML(data.message, { allowedTags: [], allowedAttributes: {} }), username: user.username, avatar: user.avatar })
    } catch (e) {
      console.log("Not a valid token for chat.")
    }
  })
})

module.exports = server
