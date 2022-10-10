const sql = require("../config/database")

// Create and Save a new Group in db
exports.createGroup = async (req, res, result) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  var newGroup = {
    groupname: req.body.groupname,
    isActive: true
  }

  sql.query("INSERT INTO groupz SET ?", newGroup, (err, result) => {
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
