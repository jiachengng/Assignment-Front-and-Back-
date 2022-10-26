import React, { useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderAdmin from "./HeaderAdmin"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function EditUser() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [groups, setGroups] = useState()
  const [loggedIn, setLoggedIn] = useState()
  const [isAdmin, setisAdmin] = useState()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [success, setSuccess] = React.useState("error")

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

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await Axios.post("http://localhost:8080/updateUserDetails", { username, password, email })
    if (response.data) {
      //console.log("User successfully updated")
      console.log(response.data.message)
      if (response.data.message == "Incorrect email format") {
        setSuccess("error")
      }
      if (response.data.message == "Incorrect password format") {
        setSuccess("error")
      }
      if (response.data.message == "User details updated") {
        setSuccess("success")
      }

      setMessage(response.data.message)
      setOpen(true)
    }
  }

  const [data, setData] = useState([])

  // const loadData = async () => {
  //   const response = await Axios.post("http://localhost:8080/displayOneUserDetails", {})
  //   setData(response.data)
  //   console.log("Username2: " + username)
  //   console.log(response)
  //   setEmail(response.email)
  // }
  async function authUser(username, token) {
    const response = await Axios.post("http://localhost:8080/authUser", { username, token })
    setLoggedIn(response.data.login)
    setisAdmin(response.data.isAdmin)
    console.log("printing is login and is admin")
    console.log(response.data.login)
    console.log(response.data.isAdmin)
  }
  // async function authUser(username, token) {
  //   const response = await Axios.post("http://localhost:8080/authUser", { username, token })
  //   setLoggedIn(response.data.isLoggedIn)
  //   setisAdmin(response.data.isAdmin)

  //   console.log(response.data.isLoggedIn)
  // }

  async function loadData(username) {
    const response = await Axios.post("http://localhost:8080/displayOneUserDetails", { username })
    setData(response.data)
    console.log("Username2: " + username)
    console.log("Email: " + response.data[0].email)
    console.log(response.data[0].email)
    setEmail(response.data[0].email)
  }

  async function loadData2(username) {
    const response = await Axios.post("http://localhost:8080/displayOneUserGroup", { username })
    console.log(response.data)
    console.log(response.data.length)
    var test = ""
    for (var i = 0; i < response.data.length; i++) {
      // for (let item of response.data) {
      // console.log(item) //
      if (i != 0) {
        test = test + ", " + response.data[i].groupname
        // test = test + ", " + item.groupname
      } else {
        test = test + response.data[i].groupname
      }
    }
    console.log(test)
    setGroups(test)
    //setGroup(response.data[0].groupname)
  }

  useEffect(() => {
    // var username1 = sessionStorage.getItem("username")
    // setUsername(username1)
    // const usernamex = sessionStorage.getItem("username")
    const username = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token")
    authUser(username, token)
    setUsername(sessionStorage.getItem("username"))
    console.log("Username1: " + sessionStorage.getItem("username"))
    loadData(sessionStorage.getItem("username"))
    loadData2(sessionStorage.getItem("username"))
  }, [])

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={success} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {isAdmin ? <HeaderAdmin /> : <HeaderLoggedIn />}
      <Page title="Home" wide="True">
        <div className="row align-items-center">
          <div className="col-lg-5 pl-lg-5 pb-3 py-lg-10" style={{ margin: "auto" }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username-register" className="text-muted mb-1">
                  <small>Username</small>
                </label>
                <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" value={username} disabled={true} autocomplete="off" />
              </div>
              <div className="form-group">
                <label for="email-register" className="text-muted mb-1">
                  <small>Email</small>
                </label>
                <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="form-control" type="text" value={email} autoComplete="off" />
              </div>
              <div className="form-group">
                <label for="password-register" className="text-muted mb-1">
                  <small>Password</small>
                </label>
                <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Enter New Password" />
              </div>
              <div className="form-group">
                <label for="groupping" className="text-muted mb-1">
                  <small>Groups</small>
                </label>
                <input id="groupping" name="groupping" className="form-control" value={groups} disabled={true} />
              </div>
              <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
                Edit User
              </button>
            </form>
          </div>
        </div>
      </Page>
    </div>
  )
}

export default EditUser
