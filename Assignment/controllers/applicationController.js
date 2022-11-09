const sql = require("../config/database")
const e = require("express")
const { sendEmail, getEmail } = require("../sendEmail")

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

exports.displayApplicationsDetails2 = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  // sql.query(`SELECT * FROM user`, async (err, result) => {
  sql.query(`SELECT App_permit_Open,App_permit_toDoList,App_permit_Doing,App_permit_Done,App_permit_Create FROM application WHERE App_Acronym = '${req.body.appAcronym}'`, async (err, result) => {
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
  if (req.body.appAcronym == "" || req.body.appAcronym == null) {
    return res.status(200).send({
      success: false,
      message: "Application Name cannot be empty"
    })
  }
  if (req.body.appDescription == "" || req.body.appDescription == null) {
    return res.status(200).send({
      success: false,
      message: "Description cannot be empty"
    })
  }
  if (req.body.appStartDate == "" || req.body.appStartDate == null) {
    return res.status(200).send({
      success: false,
      message: "Start Date cannot be empty"
    })
  }
  if (req.body.appEndDate == "" || req.body.appEndDate == null) {
    return res.status(200).send({
      success: false,
      message: "End Date cannot be empty"
    })
  }
  if (req.body.appPermitOpen == "" || req.body.appPermitOpen == null || req.body.appPermitToDoList == "" || req.body.appPermitToDoList == null || req.body.appPermitDone == "" || req.body.appPermitDone == null || req.body.appPermitCreate == "" || req.body.appPermitCreate == null) {
    return res.status(200).send({
      success: false,
      message: "Please select all permission"
    })
  }
  if (req.body.appRnumber == "" || req.body.appRnumber == null) {
    return res.status(200).send({
      success: false,
      message: "R number cannot be empty"
    })
  }
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
  if (req.body.appAcronym == "" || req.body.appAcronym == null) {
    return res.status(200).send({
      success: false,
      message: "Application Name cannot be empty"
    })
  }
  if (req.body.appDescription == "" || req.body.appDescription == null) {
    return res.status(200).send({
      success: false,
      message: "Description cannot be empty"
    })
  }
  if (req.body.appStartDate == "" || req.body.appStartDate == null) {
    return res.status(200).send({
      success: false,
      message: "Start Date cannot be empty"
    })
  }
  if (req.body.appEndDate == "" || req.body.appEndDate == null) {
    return res.status(200).send({
      success: false,
      message: "End Date cannot be empty"
    })
  }
  if (req.body.appPermitOpen == "" || req.body.appPermitOpen == null || req.body.appPermitToDoList == "" || req.body.appPermitToDoList == null || req.body.appPermitDone == "" || req.body.appPermitDone == null || req.body.appPermitCreate == "" || req.body.appPermitCreate == null) {
    return res.status(200).send({
      success: false,
      message: "Please select all permission"
    })
  }
  if (req.body.appRnumber == "" || req.body.appRnumber == null) {
    return res.status(200).send({
      success: false,
      message: "R number cannot be empty"
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
    App_permit_Done: req.body.appPermitDone,
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
  if (req.body.taskName == "" || req.body.taskName == null) {
    return res.status(200).send({
      success: false,
      message: "Task Name cannot be empty"
    })
  }
  if (req.body.taskDescription == "" || req.body.taskDescription == null) {
    return res.status(200).send({
      success: false,
      message: "Description cannot be empty"
    })
  }
  var m = new Date()
  var dateString = m.getUTCFullYear() + "/" + ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" + ("0" + m.getUTCDate()).slice(-2) + " " + ("0" + m.getUTCHours()).slice(-2) + ":" + ("0" + m.getUTCMinutes()).slice(-2) + ":" + ("0" + m.getUTCSeconds()).slice(-2)

  var taskNote = "[" + req.body.taskCreator + "] created the task. [" + dateString + "]"
  if (req.body.taskNotes != "") {
    var newNote = "[" + req.body.taskCreator + "] added a new note: " + req.body.taskNotes + " [" + dateString + "]"
    taskNote = newNote + "\n" + taskNote
  }
  var taskPlan = null
  if (req.body.plan != "") {
    taskPlan = req.body.plan
  }
  var newTask = {
    Task_id: req.body.taskId,
    Task_name: req.body.taskName,
    Task_description: req.body.taskDescription,
    // Task_notes: req.body.taskNotes,
    Task_notes: taskNote,
    // Task_plan: req.body.plan,
    Task_plan: taskPlan,
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
      sql.query(`UPDATE application SET App_Rnumber = '${req.body.newAppRnumber}' WHERE App_Acronym = '${req.body.appAcronym}'`, (err, result) => {})
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

exports.displayTaskDetails = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  // sql.query(`SELECT * FROM user`, async (err, result) => {
  sql.query(`SELECT * FROM task`, async (err, result) => {
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

exports.getAppRnumber = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  // sql.query(`SELECT * FROM user`, async (err, result) => {
  sql.query(`SELECT App_Rnumber FROM application WHERE App_Acronym = '${req.body.appAcronym}'`, async (err, result) => {
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
exports.createPlan = async (req, res, result) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  var newPlan = {
    Plan_MVP_name: req.body.planName,
    Plan_startDate: req.body.planStartDate,
    Plan_endDate: req.body.planEndDate,
    Plan_app_Acronym: req.body.appAcronym,
    Plan_color: req.body.appColor
  }
  sql.query("INSERT INTO plan SET ?", newPlan, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(200).send({
          success: true,
          message: "Plan name already exist in Database"
        })
      }
    } else {
      console.log(result)
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: result,
        message: "Plan Created",
        newPlan
      })
      // console.log(result)
      console.log("created plan: ", { id: res.insertId, ...newPlan })
      // console.log(success)
    }
    // console.log("created account: ", { id: res.insertId, ...newAccount })
    // result(null, { id: res.insertId, ...newAccount })
  })
}
exports.displayPlanDetails = async (req, res) => {
  console.log("=============================================")
  console.log("1")
  // Validate request
  if (!req.body) {
    console.log("2")
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  // sql.query(`SELECT * FROM user`, async (err, result) => {
  sql.query(`SELECT * FROM plan`, async (err, result) => {
    if (err) {
      console.log("3")
      console.log("error: ", err)
      res.send("Unable to get results")
      return
    } else {
      console.log("4")
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
exports.displayPlanDetails2 = async (req, res) => {
  // Validate request
  if (!req.body) {
    console.log("2")
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  // sql.query(`SELECT * FROM user`, async (err, result) => {
  sql.query(`SELECT * FROM plan WHERE Plan_app_Acronym = '${req.body.appAcronym}'`, async (err, result) => {
    if (err) {
      console.log("3")
      console.log("error: ", err)
      res.send("Unable to get results")
      return
    } else {
      console.log("4")
      // if (result.length === 1) {
      //   console.log("User details: ", result[0])
      // } else {
      //   console.log("Error")
      // }
      var options = []
      for (let i = 0; i < result.length; i++) {
        var plan = new Object()
        // console.log(result)
        plan.value = result[i].Plan_MVP_name
        plan.label = result[i].Plan_MVP_name
        options.push(plan)
      }
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: options
      })
    }
  })
}
exports.updateTask = async (req, res) => {
  console.log("00000000")
  console.log("Task ID: " + req.body.taskId)

  var m = new Date()
  var dateString = m.getUTCFullYear() + "/" + ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" + ("0" + m.getUTCDate()).slice(-2) + " " + ("0" + m.getUTCHours()).slice(-2) + ":" + ("0" + m.getUTCMinutes()).slice(-2) + ":" + ("0" + m.getUTCSeconds()).slice(-2)
  //notes
  var taskNote = req.body.taskNotes
  if (req.body.newtaskNotes != "") {
    console.log("New Note1 : " + req.body.newtaskNotes)
    var newNote = "[" + req.body.userName + "] added a new note: " + req.body.newtaskNotes + " [" + dateString + "]"
    console.log("New Note2 : " + newNote)
    taskNote = newNote + "\n" + taskNote
  }
  //description
  var taskToUpdate = ""
  var initialDescription = req.body.taskDescription
  var newTaskDescription = req.body.newtaskDescription
  if (newTaskDescription != initialDescription) {
    if (newTaskDescription != "") {
      taskToUpdate = newTaskDescription
      var newNote = "[" + req.body.userName + "] editted the description from: " + initialDescription + " to " + newTaskDescription + " [" + dateString + "]"
      taskNote = newNote + "\n" + taskNote
    } else {
      taskToUpdate = initialDescription
      // var newNote = "[" + req.body.userName + "] editted the description from: " + initialDescription + " to " + newTaskDescription + " [" + dateString + "]"
      // taskNote = newNote + "\n" + taskNote
    }
  } else {
    taskToUpdate = initialDescription
  }
  //plan
  //description
  var planToUpdate = ""
  var initialPlan = req.body.taskPlan
  var newPlan = req.body.newTaskPlan
  console.log("Initial Plan: ")
  console.log(initialPlan)
  console.log("New Plan: ")
  console.log(newPlan)

  if (newPlan != initialPlan) {
    if (newPlan != "") {
      planToUpdate = newPlan
      var newNote = "[" + req.body.userName + "] editted the plan from: " + initialPlan + " to " + newPlan + " [" + dateString + "]"
      taskNote = newNote + "\n" + taskNote
    } else {
      planToUpdate = initialPlan
      // var newNote = "[" + req.body.userName + "] editted the description from: " + initialDescription + " to " + newTaskDescription + " [" + dateString + "]"
      // taskNote = newNote + "\n" + taskNote
    }
  } else {
    planToUpdate = initialPlan
  }

  // console.log("Initial Description: " + initialDescription)
  // console.log("New Description: " + newTaskDescription)
  // console.log("Final Description: " + taskToUpdate)

  // if (req.body.taskNotes == "") {
  // sql.query(`UPDATE task SET Task_name = '${req.body.taskName}',Task_description = '${req.body.taskDescription}',Task_notes = '${taskNote}}',Task_state = '${req.body.taskState}', Task_plan = '${req.body.taskPlan}' WHERE Task_id = '${req.body.taskId}'`, async (err, result) => {
  // sql.query(`UPDATE task SET Task_name = '${req.body.taskName}',Task_description = '${taskToUpdate}',Task_notes = '${taskNote}',Task_state = '${req.body.taskState}', Task_plan = '${req.body.taskPlan}' WHERE Task_id = '${req.body.taskId}'`, async (err, result) => {
  sql.query(`UPDATE task SET Task_description = '${taskToUpdate}',Task_notes = '${taskNote}', Task_plan = '${planToUpdate}' WHERE Task_id = '${req.body.taskId}'`, async (err, result) => {
    if (err) {
      console.log("1111111111111")
      console.log("error: ", err)
      res.send("Unable to get results")
      return
    } else {
      console.log("2222222222")
      return res.status(200).send({
        success: true,
        message: "Task Updated"
      })
    }
  })
  // }
}

exports.updateTask2 = async (req, res) => {
  var newState = ""

  console.log("Update Task Inputs: ")
  // console.log("State: " + req.body.newState)
  console.log("State: " + newState)
  console.log("TaskId: " + req.body.taskid)
  var m = new Date()
  var dateString = m.getUTCFullYear() + "/" + ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" + ("0" + m.getUTCDate()).slice(-2) + " " + ("0" + m.getUTCHours()).slice(-2) + ":" + ("0" + m.getUTCMinutes()).slice(-2) + ":" + ("0" + m.getUTCSeconds()).slice(-2)
  var taskNote = req.body.taskNotes
  if (req.body.movement == "shiftRight") {
    if (req.body.initialState == "open") {
      newState = "toDo"
    } else if (req.body.initialState == "toDo") {
      newState = "doing"
    } else if (req.body.initialState == "doing") {
      newState = "done"
    } else if (req.body.initialState == "done") {
      newState = "close"
    } else {
      newState = req.body.initialState
    }
    var newNote = "[" + req.body.userName + "] promoted the task from: " + req.body.initialState + " to " + newState + " [" + dateString + "]"
  }
  if (req.body.movement == "shiftLeft") {
    if (req.body.initialState == "toDo") {
      newState = "open"
    } else if (req.body.initialState == "doing") {
      newState = "toDo"
    } else if (req.body.initialState == "done") {
      newState = "doing"
    } else if (req.body.initialState == "close") {
      newState = "done"
    } else {
      newState = req.body.initialState
    }
    var newNote = "[" + req.body.userName + "] demoted the task from: " + req.body.initialState + " to " + newState + " [" + dateString + "]"
  }
  // var newNote = "[" + req.body.userName + "] demoted the task from: " + req.body.initialState + " to " + newState + " [" + dateString + "]"
  taskNote = newNote + "\n" + taskNote

  if (newState == "done") {
    var emailList = await getEmail("pl")
    var msg = `Project lead, \n \n [TaskID]${req.body.taskid} from [Application]${req.body.taskAppAcronym} has been promoted from DOING to DONE state \n\n System generated message, do not reply`
    sendEmail(emailList[0], msg)
    sendEmail(emailList[1], msg)
  }

  sql.query(`UPDATE task SET Task_state = '${newState}', Task_notes='${taskNote}' WHERE Task_id = '${req.body.taskid}'`, async (err, result) => {
    if (err) {
      console.log("1111111111111")
      console.log("error: ", err)
      res.send("Unable to get results")
      return
    } else {
      console.log("2222222222")
      return res.status(200).send({
        success: true,
        message: "Task Updated"
      })
    }
  })
}

exports.getPlanColor = async (req, res) => {
  sql.query(`SELECT Plan_color from plan WHERE Plan_MVP_name = '${req.body.taskPlanColor}'`, async (err, result) => {
    if (err) {
      res.send("Unable to get results")
      return
    } else {
      return res.send(result)
    }
  })
}

exports.displayPlanDetails3 = async (req, res) => {
  // Validate request
  if (!req.body) {
    console.log("2")
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  // sql.query(`SELECT * FROM user`, async (err, result) => {
  sql.query(`SELECT * FROM plan WHERE Plan_app_Acronym = '${req.body.appAcronym}'`, async (err, result) => {
    if (err) {
      console.log("3")
      console.log("error: ", err)
      res.send("Unable to get results")
      return
    } else {
      console.log("4")
      // if (result.length === 1) {
      //   console.log("User details: ", result[0])
      // } else {
      //   console.log("Error")
      // }
      var options = []
      for (let i = 0; i < result.length; i++) {
        var plan = new Object()
        // console.log(result)
        plan.name = result[i].Plan_MVP_name
        plan.color = result[i].Plan_color
        options.push(plan)
      }
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: options
      })
    }
  })
}
