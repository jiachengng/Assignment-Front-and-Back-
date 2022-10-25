import React, { useEffect, useState } from "react"
import Page from "./Page"
import Modal from "react-modal"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import HeaderLoggedIn from "./HeaderLoggedIn"
import Box from "@mui/material/Box"
import style from "../style"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function CreateUser(props) {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [groupname, setGroupname] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState()
  const [count, setCount] = useState(0)
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("Default")
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

  //==========================
  const loadData = async () => {
    const response = await Axios.get("http://localhost:8080/displayUserDetails")
    // const rows = response.data
    // console.log("HELLO")
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      "z-index": 1000
    }
  }

  function openModal() {
    setIsOpen(true)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00"
  }

  function closeModal() {
    setIsOpen(false)
  }
  let subtitle

  async function submit(e) {
    e.preventDefault()
    const response = await Axios.post("http://localhost:8080/createUser", { username, email, password })
    // if (response.data) {
    if (response.data.message == "User Created") {
      setSuccess("success")

      console.log("User successfully created")
      console.log(response.data)
      props.onSubmit(count)

      setCount(count + 1)

      // setMessage(response.data.message)
      // setOpen(true)
    } else {
      console.log("Error")
    }
    setMessage(response.data.message)
    setOpen(true)
  }
  async function submit2(e) {
    e.preventDefault()
    const response = await Axios.post("http://localhost:8080/createGroup", { groupname })
    if (response.data.message == "Group Created") {
      console.log("Group successfully created")
      setSuccess("success")
      closeModal()
      // console.log(response.data)
    } else {
      console.log("Error")
    }
    setMessage(response.data.message)
    setOpen(true)
  }
  useEffect(() => {}, [props.users])
  // props.onSubmit(count)
  // setCount(count + 1)
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={success} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <form>
        <Modal name="ReactModal__Overlay" isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Create Group</h2>
          <div>Enter New Group Name</div>
          {/* <button onClick={closeModal}>close</button> */}
          <form>
            <input onChange={e => setGroupname(e.target.value)} />
            <button onClick={submit2}>Create</button>
          </form>
          <div>
            <br></br>
          </div>
          <button onClick={closeModal}>close</button>
        </Modal>
        <div className="form-group">
          <label htmlFor="username-register" className="text-muted mb-1">
            <small>Username</small>
          </label>
          <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder="Enter username" autocomplete="off" />
        </div>
        <div className="form-group">
          <label for="email-register" className="text-muted mb-1">
            <small>Email</small>
          </label>
          <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" required />
        </div>
        <div className="form-group">
          <label for="password-register" className="text-muted mb-1">
            <small>Password</small>
          </label>
          <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Enter Password" />
        </div>
        <div></div>
        <button onClick={submit} className="py-1 mt-2 btn btn-lg btn-success btn-block">
          Create User
        </button>

        {/* <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button> */}
      </form>
      <button className="py-1 mt-2 btn btn-lg btn-success btn-block" onClick={openModal}>
        Create Group
      </button>
    </div>
  )
}

export default CreateUser
