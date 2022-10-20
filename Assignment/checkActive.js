const db = require("./config/database")

exports.CheckActive = (username, groupname) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT isactive FROM usergroup WHERE username = '${username}' AND groupname = '${groupname}'`
    let sql2 = `UPDATE usergroup SET isactive = true WHERE username= '${username}' AND groupname='${groupname}'`

    db.query(sql, (err, results) => {
      if (err) {
        reject(false)
      } else {
        if (results[0].isactive === 1) {
          // console.log("its admin");
          resolve("true")
        } else {
          db.query(sql2, (err2, results2) => {})
          resolve(true)
        }
      }
    })
  })
}

// exports.SetToActive = (username, groupname) => {
//   return new Promise((resolve, reject) => {
//     //let sql = `SELECT isactive FROM usergroup WHERE username = '${username}' AND groupname = '${groupname}'`
//     let sql = `UPDATE usergroup SET isactive = true WHERE username= '${username}' AND groupname='${groupname}'`

//     db.query(sql, (err, results) => {
//       if (err) {
//         reject(false)
//       } else {
//         if (results.length === 1) {
//           // console.log("its admin");
//           resolve(true)
//         } else {
//           resolve(false)
//         }
//       }
//     })
//   })
// }

exports.CheckActive = (username, groupname) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT isactive FROM usergroup WHERE username = '${username}' AND groupname = '${groupname}'`
    let sql2 = `UPDATE usergroup SET isactive = true WHERE username= '${username}' AND groupname='${groupname}'`

    db.query(sql, (err, results) => {
      if (err) {
        reject(false)
      } else {
        if (results[0].isactive === 1) {
          // console.log("its admin");
          resolve(true)
        } else {
          db.query(sql2, (err2, results2) => {})
          resolve(true)
        }
      }
    })
  })
}

exports.AddUserGroup = (username, groupname) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO usergroup VALUES('${username}','${groupname}',true)`
    db.query(sql, (err, results) => {
      if (err) {
        reject(false)
      } else {
        if (results.length === 1) {
          // console.log("its admin");
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}

exports.CheckActive = (username, groupname) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT isactive FROM usergroup WHERE username = '${username}' AND groupname = '${groupname}'`
    let sql2 = `UPDATE usergroup SET isactive = true WHERE username= '${username}' AND groupname='${groupname}'`

    db.query(sql, (err, results) => {
      if (err) {
        reject(false)
      } else {
        if (results[0].isactive === 1) {
          // console.log("its admin");
          resolve(true)
        } else {
          db.query(sql2, (err2, results2) => {})
          resolve(true)
        }
      }
    })
  })
}

exports.SetToInactive = (username, groupname) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE usergroup SET isactive = false WHERE username= '${username}' AND groupname='${groupname}'`
    db.query(sql, (err, results) => {
      if (err) {
        reject(false)
      } else {
        if (results.length === 1) {
          // console.log("its admin");
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}

exports.GetOneUser = username => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM user WHERE username = '${username}'`
    let sql2 = `UPDATE usergroup SET isactive = true WHERE username= '${username}' AND groupname='${groupname}'`

    db.query(sql, (err, results) => {
      if (err) {
        reject(false)
      } else {
        if (results[0].isactive === 1) {
          // console.log("its admin");
          resolve("true"), results
        }
      }
    })
  })
}
