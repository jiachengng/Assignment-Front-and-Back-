import React, { useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
//===================================================
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Header from "./Header"
import HeaderLoggedIn from "./HeaderLoggedIn"

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

function DisplayUser(props) {
  const [data, setData] = useState([])
  const [loggedIn, setLoggedIn] = useState()
  const [isAdmin, setisAdmin] = useState()
  const [count, setCount] = useState(50)
  const [editUser, setEditUser] = useState(0)
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [groupname, setGroupname] = useState()
  const [password, setPassword] = useState()
  const loadData = async () => {
    const response = await Axios.get("http://localhost:8080/displayUserDetails")
    setData(response.data)
    // const rows = response.data
    // console.log("HELLO")
  }
  function managerUserButtonFunction(username, email, password, groups) {
    setEditUser(username)
    setUsername(username)
    setEmail(email)
    setPassword(password)
    setGroupname(groups)
  }

  async function submit(e) {
    // e.preventDefault()
    const response = await Axios.post("http://localhost:8080/updateUserDetails", { username, email, password })
    if (response.data) {
      console.log("User successfully Updated")
      console.log(response.data)
    } else {
      console.log("Error")
    }
  }

  async function authUser(username, token) {
    const response = await Axios.post("http://localhost:8080/authUser", { username, token })
    setLoggedIn(response.data.login)
    setisAdmin(response.data.isAdmin)
    console.log("printing is login and is admin")
    console.log(response.data.login)
    console.log(response.data.isAdmin)
  }

  useEffect(() => {
    const username = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token")
    loadData()
    // ,
    // authUser(username, token)
  }, [props.users])
  // props.onSubmit(count)
  // setCount(count + 1)

  function createData(username, email, password) {
    return { username, email, password }
  }

  // const userlogintoken = sessionStorage.getItem("token")
  // if (userlogintoken != null) {
  //   setLoggedIn(true)
  // }

  const rows = [createData("Frozen yoghurt", "159", "cnrojencr"), createData("Frozen yoghurt", "159", "cnrojencr"), createData("Frozen yoghurt", "159", "cnrojencr")]

  return (
    <TableContainer component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell align="right">No.</TableCell> */}
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">Groups</TableCell>
            <TableCell align="right">Action</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        {/* {data.map((item, index) => xxx)} */}
        {/* {editUser == item.username && ( */}
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={item.name}>
                {editUser !== item.username && (
                  <>
                    <TableCell align="right">{item.username}</TableCell>
                    <TableCell align="right">{item.email}</TableCell>
                    <TableCell align="right">********</TableCell>
                    <TableCell align="right">{item.groups}</TableCell>
                    <TableCell align="right">
                      <button type="submit" onClick={() => managerUserButtonFunction(item.username, item.email, item.password, item.groups)} className="py-1 mt-2 btn btn-lg btn-success btn-block" color="grey">
                        Manage
                      </button>
                    </TableCell>
                  </>
                )}

                {editUser === item.username && (
                  <>
                    <TableCell align="right">
                      <input value={item.username} disabled />
                    </TableCell>
                    <TableCell align="right">
                      <input type="text" onChange={e => setEmail(e.target.value)} defaultValue={item.email} />
                    </TableCell>
                    <TableCell align="right">
                      <input type="password" onChange={e => setPassword(e.target.value)} />
                    </TableCell>
                    <TableCell align="right">
                      <input onChange={e => setGroupname(e.target.value)} defaultValue={item.groups} />
                    </TableCell>
                    <TableCell align="right">
                      <button type="submit" onClick={() => submit()} className="py-1 mt-2 btn btn-lg btn-success btn-block" color="grey">
                        Update
                      </button>
                      <button onClick={() => setEditUser()} className="py-1 mt-2 btn btn-lg btn-success btn-block" color="grey">
                        Cancel
                      </button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DisplayUser
