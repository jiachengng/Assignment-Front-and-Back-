const db = require("./config/database")

exports.CheckGroup = (username, groupname) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM usergroup WHERE username = '${username}' AND groupname = '${groupname}'`

    db.query(sql, (err, results) => {
      if (err) {
        reject(false)
      } else {
        if (results[0].isactive === 1) {
          resolve(true)
        }
      }
    })
  })
}
