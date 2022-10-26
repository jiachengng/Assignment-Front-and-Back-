const sql = require("../config/database")

const groupnamePattern = /^[A-Za-z0-9]+$/

// Create and Save a new Group in db
exports.createGroup = async (req, res, result) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  if (!req.body.groupname.match(groupnamePattern) || req.body.groupname.length < 2) {
    return res.status(200).send({
      success: false,
      message: "Incorrect group name format"
    })
  }

  var newGroup = {
    groupname: req.body.groupname,
    isActive: true
  }

  sql.query("INSERT INTO groupz SET ?", newGroup, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(200).send({
          success: true,
          message: "Group Name already exist in Database"
        })
      }
    } else {
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: result,
        message: "Group Created",
        newGroup
      })
      // console.log(result)
      console.log("created account: ", { id: res.insertId, ...newGroup })
      // console.log(success)
    }
    // console.log("created account: ", { id: res.insertId, ...newAccount })
    // result(null, { id: res.insertId, ...newAccount })
  })
}

exports.getUserGroupByUserName = async (req, res, result) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  sql.query(`SELECT groupname FROM usergroup WHERE username = '${req.body.username}' `, async (err, result) => {
    if (err) {
      console.log("error: ", err)
      // result(err, null)
      // return
      res.send("Unable to post results")
      return
    } else {
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: result,
        result: result[0]
      })
      // console.log(result)
      // console.log("created account: ", { id: res.insertId, ...newGroup })
      // console.log(success)
    }
    // console.log("created account: ", { id: res.insertId, ...newAccount })
    // result(null, { id: res.insertId, ...newAccount })
  })
}

exports.getAllGroups = async (req, res, result) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  sql.query("SELECT * FROM groupz where isactive =1", (err, result) => {
    if (err) {
      console.log("error: ", err)
      // result(err, null)
      // return
      res.send("Unable to post results")
      return
    } else {
      var options = []
      for (let i = 0; i < result.length; i++) {
        var group = new Object()
        // console.log(result)
        group.value = result[i].groupname
        group.label = result[i].groupname
        options.push(group)
      }
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: options
      })
    }
    // console.log("created account: ", { id: res.insertId, ...newAccount })
    // result(null, { id: res.insertId, ...newAccount })
  })
}
