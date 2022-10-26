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
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const animatedComponents = makeAnimated()

function DisplayUser(props) {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [defaultGroups, setDefaultGroups] = useState([])
  const [loggedIn, setLoggedIn] = useState()
  const [isAdmin, setisAdmin] = useState()
  const [count, setCount] = useState(50)
  const [editUser, setEditUser] = useState(0)
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [groupname, setGroupname] = useState()
  const [password, setPassword] = useState("")

  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("Default")
  const [success, setSuccess] = React.useState("error")

  const [isactive, setChecked] = React.useState(false)
  const [onChanged, setOnChanged] = React.useState(false)

  const handleChange2 = () => {
    setChecked(!isactive)
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpen(false)

      return
    }

    setOpen(false)
  }

  var array = []
  const loadData = async () => {
    const response = await Axios.get("http://localhost:8080/displayUserDetails")
    setData(response.data)
    // const rows = response.data
    // console.log("HELLO")
  }
  // var options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" }
  // ]
  // function handleCloseGrp() {
  //   console.log("Close")
  //   setChanged(username)
  // }
  const handleChange = optionss => {
    setSelectedOptions(optionss)
    for (let i = 0; i < optionss.length; i++) {
      array.push(optionss[i].value)
    }
    setOnChanged(true)
    console.log("Array: ")
    console.log(array)
    setSelectedOptions(array)
  }

  const loadData2 = async () => {
    const response = await Axios.post("http://localhost:8080/getAllGroups")
    setData2(response.data.data)
  }

  function managerUserButtonFunction(username, email, password, groups, isactive) {
    // setGroupname()
    setGroupname(groups)
    setEditUser(username)
    setUsername(username)
    setEmail(email)
    if (password.length > 15) {
      setPassword("")
    } else {
      setPassword(password)
    }
    if (isactive == 1) {
      setChecked(true)
    } else {
      setChecked(false)
    }

    // for (let i = 0; i < data2.length; i++) {
    //   options.push(data2[i])
    // }
    // console.log(options)
    if (groups == null) {
      setDefaultGroups()
    } else {
      var arrayDefaultGroup = groups.split(/[, ]+/)
      console.log("Printing split groups: ")
      console.log(arrayDefaultGroup)
      var options = []
      for (let i = 0; i < arrayDefaultGroup.length; i++) {
        var group = new Object()
        // console.log(result)
        group.value = arrayDefaultGroup[i]
        group.label = arrayDefaultGroup[i]
        options.push(group)
      }
      setDefaultGroups(options)
    }
    console.log("Printing default groups: ")
    console.log(options)
  }

  async function submit(e) {
    // e.preventDefault()
    const response = await Axios.post("http://localhost:8080/updateUserDetails", { username, email, password, isactive })
    // if (response.data.updated === 1) {
    if (response.data) {
      console.log("User table successfully Updated")
      var usergroup = []
      console.log("Printing groupArray values: ")
      for (let i = 0; i < selectedOptions.length; i++) {
        var group = new Object()
        group.value = selectedOptions[i]
        console.log(selectedOptions[i])
        usergroup.push(group)
      }
      console.log(usergroup)

      if (onChanged == true) {
        const response2 = await Axios.post("http://localhost:8080/editUserGroup", { username, usergroup })
        setOnChanged(false)
      }
      // const response2 = await Axios.post("http://localhost:8080/editUserGroup", { username, usergroup })
      // if (response2.data.updated === 1) {
      // console.log("************************")
      // console.log(response2.data.updated)
      // console.log(response.data.message)
      if (response.data.message == "User details updated") {
        setSuccess("success")
        console.log("User table successfully Updated")
      }
      if (response.data.message == "Incorrect email format") {
        setSuccess("error")
      }
      console.log("TESTINGME")
      setMessage(response.data.message)
      setOpen(true)
      // console.log(selectedOptions)
      setEditUser()
      // setGroupname()
      // setDefaultGroups()
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
    loadData2()
    // ,
    // authUser(username, token)
  }, [props.users, loadData(), loadData2()])
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
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={success} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      <TableContainer component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell align="right">No.</TableCell> */}
              <TableCell width={10} align="center" className="helen">
                User Name
              </TableCell>
              <TableCell width={10} align="center">
                Email
              </TableCell>
              <TableCell width={10} align="center">
                Password
              </TableCell>
              <TableCell width={20} align="center">
                Groups
              </TableCell>
              <TableCell width={20} align="center">
                Active
              </TableCell>

              <TableCell width={10} align="center">
                Action
              </TableCell>
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
                      <TableCell align="center">{item.username}</TableCell>
                      <TableCell align="center">{item.email}</TableCell>
                      <TableCell align="center">********</TableCell>
                      <TableCell align="center">{item.groups}</TableCell>
                      <TableCell align="center">{item.isactive}</TableCell>
                      <TableCell align="center">
                        {/* <Button onClick={() => managerUserButtonFunction(item.username, item.email, item.password, item.groups)} className="py-1 mt-1 btn btn-lg btn-success btn-block" color="grey">
                        Manage
                      </button> */}
                        <Button onClick={() => managerUserButtonFunction(item.username, item.email, item.password, item.groups, item.isactive)} variant="contained" size="small">
                          Edit
                        </Button>
                      </TableCell>
                    </>
                  )}

                  {editUser === item.username && (
                    <>
                      <TableCell align="center">
                        <input size="3" value={item.username} disabled />
                      </TableCell>
                      <TableCell align="center">
                        <input size="10" type="text" onChange={e => setEmail(e.target.value)} defaultValue={item.email} />
                      </TableCell>
                      <TableCell align="center">
                        <input size="3" type="password" id="input-box" onChange={e => setPassword(e.target.value)} />
                      </TableCell>
                      <TableCell align="center" style={{ width: "200px" }}>
                        {/* <input size="3" onChange={e => setGroupname(e.target.value)} defaultValue={item.groups} /> */}
                        {/* <Select closeMenuOnSelect={false} defaultValue={[]} isMulti name="colors" isClearable={false} options={data2} className="basic-multi-select" classNamePrefix="select" /> */}
                        <Select closeMenuOnSelect={false} components={animatedComponents} defaultValue={defaultGroups} isMulti options={data2} onChange={handleChange} />
                      </TableCell>
                      <TableCell>
                        <input type="checkbox" checked={isactive} onChange={handleChange2} />
                      </TableCell>

                      <TableCell align="center">
                        {/* <button type="submit" onClick={() => submit()} className="py-1 mt-1 btn btn-lg btn-success btn-block" color="grey">
                        Update
                      </button> */}
                        <Button width="50%" onClick={() => submit()} variant="contained" size="small" color="success" style={{ marginBottom: "5px" }}>
                          Update
                        </Button>
                        {/* <button onClick={() => setEditUser()} className="py-1 mt-1 btn btn-lg btn-success btn-block" color="grey">
                        Cancel
                      </button> */}
                        <Button width="50%" onClick={() => setEditUser()} variant="contained" color="error" size="small">
                          Cancel
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DisplayUser
