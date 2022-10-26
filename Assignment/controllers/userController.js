const sql = require("../config/database")
const bcrypt = require("bcryptjs")
const e = require("express")
const { CheckActive, AddUserGroup, SetToInactive } = require("../checkActive")
const { JsonWebTokenError } = require("jsonwebtoken")
const jwt = require("jsonwebtoken")
const sendToken = require("../jwtToken")
const CheckGroup = require("../checkGroup")

const usernamePattern = /^[A-Za-z0-9]+$/
const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,10}$/ // Assert a string to have at least
const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

// Create and Save a new User in db
exports.createUser = async (req, res, result) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  if (!req.body.username.trim().match(usernamePattern) || req.body.username.trim().length < 5) {
    return res.status(200).send({
      success: false,
      message: "Incorrect username format"
    })
  }
  if (!req.body.email.trim().match(emailPattern)) {
    return res.status(200).send({
      success: false,
      message: "Incorrect email format"
    })
  }
  if (!req.body.password.trim().match(passwordPattern)) {
    return res.status(200).send({
      success: false,
      message: "Incorrect password format"
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
      if (err.code === "ER_DUP_ENTRY") {
        res.status(200).send({
          success: true,
          message: "Username already exist in Database"
        })
      }
    } else {
      console.log(result)
      res.status(200).send({
        success: true,
        results: result.length,
        // requestMethod: req.requestMethod,
        data: result,
        message: "User Created",
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
  sql.query(`SELECT * FROM user WHERE username = '${req.body.username}' AND isactive = true `, async (err, result) => {
    if (err) {
      console.log("error: ", err)
      return
      res.status(200).send({
        message: "Invalid login details"
      })
    } else {
      if (result.length === 1) {
        console.log("found account: ", result[0])
        const trueornot = await bcrypt.compare(req.body.password, result[0].password)
        console.log("Password of account is: " + trueornot)
        if (trueornot) {
          console.log("Logged in")
          sendToken(req.body.username, 200, res)

          // const token = this.getJwtToken(req.body.username)

          // res.status(200).send({
          //   success: true,
          //   results: result.length,
          //   // requestMethod: req.requestMethod,
          //   data: result,
          //   token: token
          // })
        } else {
          console.log("account cannot be found")
          return res.status(200).send({
            message: "Invalid login details"
          })
        }
      } else {
        return res.status(200).send({
          message: "Invalid login details"
        })
      }
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

      if (testarr1.length === 0) {
        for (var group2 of testarr2) {
          await AddUserGroup(req.body.username, group2)
        }
      }

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
                }
                // else {
                //   console.log("return")
                // }
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
        data: result,
        updated: true
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
  console.log("PASSWORD: " + req.body.password)
  console.log("EMAIL: " + req.body.email)
  console.log("ISACTIVE: " + req.body.isactive)
  // Validate request
  // if (!req.body) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   })
  // }
  if (req.body.isactive == false) {
    req.body.isactive = 0
  } else {
    req.body.isactive = 1
  }
  // if no password no email
  if (req.body.password.trim() < 1 && req.body.email.trim() < 1) {
    console.log("IF NO PASSWORD AND EMAIL")
    res.status(200).send({
      message: "Nothing is changed"
    })
  } else if (req.body.password.trim() < 1) {
    if (!req.body.email.trim().match(emailPattern)) {
      return res.status(200).send({
        success: false,
        message: "Incorrect email format"
      })
    }
    console.log("IF NO PASSWORD")
    sql.query(`UPDATE user SET email = '${req.body.email.trim()}',isactive = '${req.body.isactive}' WHERE username = '${req.body.username}'`, async (err, result) => {
      if (err) {
        console.log("error: ", err)
        res.send("Unable to get results")
        return
      } else {
        console.log(result)
        if (result.changedRows === 1 || result.affectedRows === 1) {
          console.log("User details updated. ")
          res.status(200).send({
            success: true,
            results: result.length,
            // requestMethod: req.requestMethod,
            updated: 1,
            message: "User details updated"
          })
        } else {
          console.log("Error")
        }
      }
    }) // if no email input
  } else if (req.body.email.trim() < 1) {
    if (!req.body.password.trim().match(passwordPattern)) {
      return res.status(200).send({
        success: false,
        message: "Incorrect password format"
      })
    }
    console.log("IF NO EMAIL")
    var newPassword = await bcrypt.hash(req.body.password.trim(), 10)
    //UPDATE user SET password = "ryan1234", email = "ryan@gmail.com" WHERE username = "ryan";
    sql.query(`UPDATE user SET password = '${newPassword}',isactive = '${req.body.isactive}' WHERE username = '${req.body.username}'`, async (err, result) => {
      if (err) {
        console.log("error: ", err)
        res.send("Unable to get results")
        return
      } else {
        console.log(result)
        if (result.changedRows === 1 || result.affectedRows === 1) {
          console.log("User details updated. ")
          res.status(200).send({
            success: true,
            results: result.length,
            // requestMethod: req.requestMethod,
            updated: 1,
            message: "User details updated"
          })
        } else {
          console.log("Error")
        }
      }
    })
  } else {
    console.log("IF ALL FIELDS THERE")
    if (!req.body.email.trim().match(emailPattern)) {
      return res.status(200).send({
        success: false,
        message: "Incorrect email format"
      })
    }
    if (!req.body.password.trim().match(passwordPattern)) {
      return res.status(200).send({
        success: false,
        message: "Incorrect password format"
      })
    }
    var newPassword = await bcrypt.hash(req.body.password.trim(), 10)
    //UPDATE user SET password = "ryan1234", email = "ryan@gmail.com" WHERE username = "ryan";
    sql.query(`UPDATE user SET password = '${newPassword}',isactive = '${req.body.isactive}', email = '${req.body.email.trim()}' WHERE username = '${req.body.username}'`, async (err, result) => {
      if (err) {
        console.log("error: ", err)
        res.send("Unable to get results")
        return
      } else {
        console.log(result)
        if (result.changedRows === 1) {
          console.log("User details updated. ")
          res.status(200).send({
            success: true,
            results: result.length,
            // requestMethod: req.requestMethod,
            message: "User details updated",
            updated: 1
          })
        } else {
          console.log("Error")
        }
      }
    })
  }
}
//=========================================================
exports.getJwtToken = function (username) {
  return jwt.sign({ id: username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME })
}
//==========================================================
exports.displayUserDetails = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  // sql.query(`SELECT * FROM user`, async (err, result) => {
  sql.query(
    `SELECT u.username, u.email, u.password, GROUP_CONCAT(ug.groupname ORDER BY ug.groupname ASC SEPARATOR ', ') as 'groups', u.isactive
  FROM user AS u
  LEFT JOIN usergroup AS ug ON ug.username = u.username AND ug.isactive = 1
  GROUP BY u.username`,
    async (err, result) => {
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
      }
    }
  )
}
//==========================================================
exports.authUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  console.log("Res.body.username: " + req.body.username)
  var isAdmin = false
  var testing = await CheckGroup(req.body.username, "admin")
    .then(resolve => {
      if (resolve) {
        console.log("RETURN TRUE")
        return true
      } else {
        console.log("RETURN FALSE")
        return false
      }
    })
    .catch(
      reject => {}
      // console.log("Runing check if active")
      //})
    )

  isAdmin = testing
  console.log("IsAdmin: " + isAdmin)

  var token = req.body.token

  if (token) {
    try {
      console.log("Token: " + token)
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      console.log("decode = ")
      console.log(decode.id)
      if (req.body.username === decode.id) {
        res.status(200).send({
          login: true,
          isAdmin: isAdmin,
          username: decode.id
        })
      } else {
        res.status(200).send({
          login: false,
          isAdmin: isAdmin,
          username: decode.id
        })
      }
    } catch (e) {
      console.log(e)
      res.status(200).send({
        login: false,
        isAdmin: isAdmin
      })
    }
  } else {
    res.status(200).send({
      login: false,
      isAdmin: isAdmin
    })
  }
}
//------------------------------------------------------------------------
exports.displayOneUserDetails = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  sql.query(`SELECT * FROM user WHERE username= '${req.body.username}'`, async (err, result) => {
    console.log("req.body.username = " + req.body.username)
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
    }
  })
}
//===============================================================================
exports.displayOneUserGroup = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }
  sql.query(`SELECT groupname FROM usergroup WHERE username= '${req.body.username}' AND isactive=1`, async (err, result) => {
    console.log("req.body.username = " + req.body.username)
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
    }
  })
}
