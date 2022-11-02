const sql = require("../config/database")
const e = require("express")

exports.displayApplicationsDetails = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  // sql.query(`SELECT * FROM user`, async (err, result) => {
  sql.query(`SELECT * FROM application`, async (err, result) => {
    if (err) {
      console.log("error: ", err)
      res.send("Unable to get results")
      return
    } else {
      // if (result.length === 1) {
      //   console.log("User details: ", result[0])
      // } else {
      //   console.log("Error")
      // }
      res.send(result)
      console.log(result)
      console.log("============================")
    }
  })
}

exports.updateApplication = async (req, res) => {
  console.log("Running: " + "updateApplication")
  console.log("App name: " + req.body.appAcronym)
  console.log("Description: " + req.body.appDescription)
  console.log("Rnumber: " + req.body.appRnumber)
  console.log("Start: " + req.body.appStartDate)
  console.log("End: " + req.body.appEndDate)
  console.log("Permit Open: " + req.body.appPermitOpen)
  console.log("Permit ToDo: " + req.body.appPermitToDoList)
  console.log("Permit Doing: " + req.body.appPermitDoing)
  console.log("Permit Done: " + req.body.appPermitDone)
  console.log("Permit Create: " + req.body.appPermitCreate)

  sql.query(`UPDATE application SET App_Description = '${req.body.appDescription}',App_startDate = '${req.body.appStartDate}',App_endDate = '${req.body.appEndDate}',App_permit_Open = '${req.body.appPermitOpen}',App_permit_toDoList = '${req.body.appPermitToDoList}',App_permit_Doing = '${req.body.appPermitDoing}',App_permit_Done = '${req.body.appPermitDone}',App_permit_Create = '${req.body.appPermitCreate}'  WHERE App_Acronym = '${req.body.appAcronym}'`, async (err, result) => {
    if (err) {
      console.log("error: ", err)
      res.send("Unable to get results")
      return
    } else {
      return res.status(200).send({
        success: true,
        message: "Application Updated"
      })
    }
  })
}

exports.createApplication = async (req, res, result) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  var newApplication = {
    App_Acronym: req.body.appAcronym,
    App_Description: req.body.appDescription,
    App_startDate: req.body.appStartDate,
    App_endDate: req.body.appEndDate,
    App_permit_Open: req.body.appPermitOpen,
    App_permit_toDoList: req.body.appPermitToDoList,
    App_permit_Doing: req.body.appPermitDoing,
    App_permit_Done: req.body.appPermitDoing,
    App_permit_Create: req.body.appPermitCreate,
    App_Rnumber: req.body.appRnumber
  }
  sql.query("INSERT INTO application SET ?", newApplication, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(200).send({
          success: true,
          message: "Application name already exist in Database"
        })
      }
    } else {
      console.log(result)
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: result,
        message: "Application Created",
        newApplication
      })
      // console.log(result)
      console.log("created application: ", { id: res.insertId, ...newApplication })
      // console.log(success)
    }
    // console.log("created account: ", { id: res.insertId, ...newAccount })
    // result(null, { id: res.insertId, ...newAccount })
  })
}

exports.createTask = async (req, res, result) => {
  console.log("Starting backend API: createTask()")
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  var newTask = {
    Task_id: req.body.taskId,
    Task_name: req.body.taskName,
    Task_description: req.body.taskDescription,
    Task_notes: req.body.taskNotes,
    Task_plan: null,
    Task_app_Acronym: req.body.appAcronym,
    Task_state: "open",
    Task_creator: req.body.taskCreator,
    Task_owner: req.body.taskCreator,
    Task_createDate: new Date("2021-01-01")
  }
  console.log("creating task....")
  sql.query("INSERT INTO task SET ?", newTask, (err, result) => {
    if (err) {
      console.log("other errror")
      console.log(err)
      if (err.code === "ER_DUP_ENTRY") {
        console.log("DUP ENTRY")
        res.status(200).send({
          success: true,
          message: "Task id already exist in Database"
        })
      }
    } else {
      console.log("else....")
      console.log(result)
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: result,
        message: "Task Created",
        newTask
      })
      // console.log(result)
      console.log("created task: ", { id: res.insertId, ...newTask })
      // console.log(success)
    }
    // console.log("created account: ", { id: res.insertId, ...newAccount })
    // result(null, { id: res.insertId, ...newAccount })
  })
}
