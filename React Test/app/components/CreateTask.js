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
import Select from "react-select"
import makeAnimated from "react-select/animated"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const animatedComponents = makeAnimated()

function CreateTask(props) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [groupname, setGroupname] = useState()
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState()
  const [count, setCount] = useState(0)
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("Default")
  const [success, setSuccess] = React.useState()
  const [data2, setData2] = useState([])

  const [taskName, setTaskName] = React.useState("")
  const [taskDescription, setTaskDescription] = React.useState("")
  const [taskNotes, setTaskNotes] = React.useState("")

  const loadData2 = async () => {
    const response = await Axios.post("http://localhost:8080/getAllGroups")
    setData2(response.data.data)
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
    console.log("1")
    e.preventDefault()
    console.log("2")
    var appAcronym = sessionStorage.getItem("appAcronym")
    var appRnumber = sessionStorage.getItem("appRnumber")
    var taskId = appAcronym + "_" + appRnumber
    var taskCreator = sessionStorage.getItem("username")
    console.log("3")
    const response = await Axios.post("http://localhost:8080/createTask", { taskName, taskDescription, taskNotes, taskId, appRnumber, taskCreator, appAcronym })
    console.log("4")
    // if (response.data) {
    if (response.data.message == "Task Created") {
      setSuccess("success")

      console.log("Task successfully created")
      console.log(response.data)
      props.onSubmit(count)
      setCount(count + 1)
      closeModal()
      // setMessage(response.data.message)
      // setOpen(true)
    } else {
      console.log("Error")
      setSuccess("error")
    }
    closeModal()
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
    }
    // if (response.data.message == "Group Name already exist in Database") {
    //   setSuccess("false")
    // }
    // if (response.data.message == "Incorrect group name format") {
    //   setSuccess("false")
    // }
    else {
      console.log("Error")
    }
    setMessage(response.data.message)
    setOpen(true)
  }
  useEffect(() => {
    loadData2()
  }, [props.users])
  // props.onSubmit(count)
  // setCount(count + 1)
  //testing
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={success} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <form>
        <Modal name="ReactModal__Overlay" isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Create Task</h2>
          {/* <div>Enter New Group Name!!!</div> */}
          {/* <button onClick={closeModal}>close</button> */}
          <form>
            <label htmlFor="username-register" className="text-muted mb-1">
              Application Name:
            </label>
            <input style={{ marginLeft: "10px" }} value={sessionStorage.getItem("appAcronym")} disabled />
            <label htmlFor="username-register" className="text-muted mb-1">
              Task Name:
            </label>
            <input style={{ marginLeft: "10px" }} onChange={e => setTaskName(e.target.value)} />
            <label style={{ marginLeft: "15px" }} htmlFor="username-register" className="text-muted mb-1">
              Description:
            </label>
            <input style={{ marginLeft: "10px" }} onChange={e => setTaskDescription(e.target.value)} />
            <label style={{ marginLeft: "15px" }} htmlFor="username-register" className="text-muted mb-1">
              Task Notes:
            </label>
            <input style={{ marginLeft: "10px" }} onChange={e => setTaskNotes(e.target.value)} />
            <div>
              <br></br>
            </div>

            <button onClick={submit}>Save</button>
          </form>
          <div>
            <br></br>
          </div>
          <button onClick={closeModal}>close</button>
        </Modal>
      </form>
      <button className="py-1 mt-2 btn btn-lg btn-warning btn-block" onClick={openModal}>
        + Create Task
      </button>
    </div>
  )
}

export default CreateTask
