const apiRouter = require("express").Router()
const userController = require("./controllers/userController")
const groupController = require("./controllers/groupController")
const applicationController = require("./controllers/applicationController")
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
// display user profile
apiRouter.route("/displayUserDetails").get(userController.displayUserDetails)
apiRouter.route("/displayOneUserDetails").post(userController.displayOneUserDetails)
apiRouter.route("/displayOneUserGroup").post(userController.displayOneUserGroup)
apiRouter.route("/authUser").post(userController.authUser)
apiRouter.route("/getAllGroups").post(groupController.getAllGroups)

apiRouter.route("/displayApplicationsDetails").post(applicationController.displayApplicationsDetails)
apiRouter.route("/displayApplicationsDetails2").post(applicationController.displayApplicationsDetails2)

apiRouter.route("/updateApplication").post(applicationController.updateApplication)
apiRouter.route("/createApplication").post(applicationController.createApplication)
apiRouter.route("/createTask").post(applicationController.createTask)
apiRouter.route("/displayTaskDetails").post(applicationController.displayTaskDetails)
apiRouter.route("/getAppRnumber").post(applicationController.getAppRnumber)
apiRouter.route("/createPlan").post(applicationController.createPlan)
apiRouter.route("/displayPlanDetails").post(applicationController.displayPlanDetails)
apiRouter.route("/displayPlanDetails2").post(applicationController.displayPlanDetails2)
apiRouter.route("/displayPlanDetails3").post(applicationController.displayPlanDetails3)

apiRouter.route("/updateTask").post(applicationController.updateTask)
apiRouter.route("/updateTask2").post(applicationController.updateTask2)
apiRouter.route("/getPlanColor").post(applicationController.getPlanColor)

//ROUTES TO CHECK ID WITH NAME
// apiRouter.route("/findUsernameById").post(userController.findUsernameById)
// apiRouter.route("/findIdByUsername").post(userController.findIdByUsername)
// apiRouter.route("/findGroupnameById").post(groupController.findGroupnameById)
// apiRouter.route("/findIdByGroupname").post(groupController.findIdByGroupname)

module.exports = apiRouter
