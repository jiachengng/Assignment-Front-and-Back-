const sql = require("../config/database")
const bcrypt = require("bcryptjs")
const e = require("express")
const { CheckActive, AddUserGroup, SetToInactive } = require("../checkActive")

// Create and Save a new User in db
exports.createUser = async (req, res, result) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  var newAccount = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
    email: req.body.email,
    isActive: true
  }

  sql.query("INSERT INTO user SET ?", newAccount, (err, result) => {
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
        newAccount
      })
      // console.log(result)
      console.log("created account: ", { id: res.insertId, ...newAccount })
      // console.log(success)
    }
    // console.log("created account: ", { id: res.insertId, ...newAccount })
    // result(null, { id: res.insertId, ...newAccount })
  })

  // Add groups to user

  var usergrouplist = req.body.usergroup
  if (Array.isArray(usergrouplist)) {
    console.log("Has user group")
    for (var group of usergrouplist) {
      var newUserGroup = {
        username: req.body.username,
        groupname: group.value,
        isActive: true
      }
      console.log("Group: " + group.value)
      // sql.query("INSERT INTO usergroup ?", newUserGroup, (err, result) => {
      sql.query("INSERT INTO usergroup VALUES('" + req.body.username + "','" + group.value + "'," + true + ")", (err, result) => {})
    }
  } else {
    console.log("Not assigned user group")
  }
}

//--------------------------------------------------------------------------------------
// Log in to User Account
exports.logIn = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  sql.query(`SELECT * FROM user WHERE username = '${req.body.username}' `, async (err, result) => {
    if (err) {
      console.log("error: ", err)
      res.send("Unable to get results")
      return
    } else {
      if (result.length === 1) {
        console.log("found account: ", result[0])
        const trueornot = await bcrypt.compare(req.body.password, result[0].password)
        console.log("Password of account is: " + trueornot)
        if (trueornot) {
          console.log("Logged in")
        }
      } else {
        console.log("account cannot be found")
      }
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: result
      })
    }
  })
}
//--------------------------------------------------------------------------------------

// Edit group for user
exports.editUserGroup = async (req, res) => {
  function removeA(arr) {
    var what,
      a = arguments,
      L = a.length,
      ax
    while (L > 1 && arr.length) {
      what = a[--L]
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1)
      }
    }
    return arr
  }
  arr1 = []
  arr2 = []
  // sql.query("INSERT INTO user SET ?", newAccount, (err, result) => {
  sql.query("SELECT groupname FROM usergroup WHERE username = '" + req.body.username + "'", async (err, result) => {
    if (err) {
      console.log("error: ", err)
      res.send("Unable to get results")
      return
    } else {
      // console.log("Current Group name: ", result)
      for (const element of result) {
        arr1.push(element.groupname)
      }
      console.log(`Current group for ${req.body.username} : ` + arr1)

      var usergrouplist = req.body.usergroup
      if (Array.isArray(usergrouplist)) {
        for (var group of usergrouplist) {
          var newUserGroup = {
            username: req.body.username,
            groupname: group.value,
            isActive: true
          }
          arr2.push(group.value)
        }
        console.log("New group: " + arr2)
      }

      console.log("Array1: " + arr1)
      console.log("Array2: " + arr2)

      var testarr1 = [].concat(arr1)
      var testarr2 = [].concat(arr2)

      //const go = async () => {
      for (var group2 of testarr2) {
        for (var group1 of testarr1) {
          console.log("Comparing g2-" + group2 + " and g1-" + group1)
          if (group2 === group1) {
            //check if active
            //sql.query("SELECT isactive FROM usergroup WHERE username = '" + req.body.username + "'AND groupname ='" + group1 + "'", async (err, result) => {
            await CheckActive(req.body.username, group1)
              .then(resolve => {
                console.log("CHECKING IF ACTIVE OR NOT")
                //if not active, change to active
                if (resolve) {
                  console.log("Array1 removing: " + group2)
                  console.log("Array2 removing: " + group2)
                  removeA(arr1, group2)
                  removeA(arr2, group2)
                } else {
                  console.log("return")
                }
              })
              .catch(
                reject => {}
                // console.log("Runing check if active")

                //})
              )
          } else {
            await AddUserGroup(req.body.username, group2)
              .then(resolve => {
                //if not active, change to active
                if (resolve) {
                } else {
                }
              })
              .catch(reject => {})
          }
        }
      }
      console.log("finally arr1:" + arr1)
      for (var groups of arr1) {
        await SetToInactive(req.body.username, groups)
          .then(resolve => {
            //if not active, change to active
            if (resolve) {
            } else {
            }
          })
          .catch(
            reject => {}
            // console.log("Runing check if active")

            //})
          )
      }
      // console.log("new Array1 : " + arr1)
      // console.log("new Array2 : " + arr2)
      //delete and move to another side later
      res.status(200).send({
        success: true,
        data: result
      })
    }
    // console.log("created account: ", { id: res.insertId, ...newAccount })
    // result(null, { id: res.insertId, ...newAccount })
  })
}
//==================================================================================
//GET ALL USERS
//===========================================================================
exports.updateUserDetails = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  var newPassword = await bcrypt.hash(req.body.password, 10)
  //UPDATE user SET password = "ryan1234", email = "ryan@gmail.com" WHERE username = "ryan";
  sql.query(`UPDATE user SET password = '${newPassword}', email = '${req.body.email}' WHERE username = '${req.body.username}'`, async (err, result) => {
    if (err) {
      console.log("error: ", err)
      res.send("Unable to get results")
      return
    } else {
      if (result.length === 1) {
        console.log("User details updated: ", result[0])
      } else {
        console.log("Error")
      }
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: result
      })
    }
  })
}
