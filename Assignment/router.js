const apiRouter = require("express").Router()
const userController = require("./controllers/userController")
const groupController = require("./controllers/groupController")
// const usergroupController = require("./controllers/usergroupController")
const cors = require("cors")

apiRouter.use(cors())

apiRouter.get("/", (req, res) => res.json("Hello, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"))

// check token to log out front-end if expired

apiRouter.route("/createUser").post(userController.createUser)
apiRouter.route("/logIn").post(userController.logIn)
apiRouter.route("/createGroup").post(groupController.createGroup)
apiRouter.route("/editUserGroup").post(userController.editUserGroup)
apiRouter.route("/getUserGroupByUserName").post(groupController.getUserGroupByUserName)
// update user profile
apiRouter.route("/updateUserDetails").post(userController.updateUserDetails)

//ROUTES TO CHECK ID WITH NAME
// apiRouter.route("/findUsernameById").post(userController.findUsernameById)
// apiRouter.route("/findIdByUsername").post(userController.findIdByUsername)
// apiRouter.route("/findGroupnameById").post(groupController.findGroupnameById)
// apiRouter.route("/findIdByGroupname").post(groupController.findIdByGroupname)

module.exports = apiRouter