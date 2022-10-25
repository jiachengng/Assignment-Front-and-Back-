const User = require("./controllers/userController")
const CheckGroup = require("./checkGroup")

const sendToken = (username, statusCode, res) => {
  const token = User.getJwtToken(username)

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  if ((username, "admin"))
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      username: username,
      message: "Login Successfully",
      token
    })
}

module.exports = sendToken
