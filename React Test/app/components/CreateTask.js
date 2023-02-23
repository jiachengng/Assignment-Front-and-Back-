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
import TextareaAutosize from "@mui/base/TextareaAutosize"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const animatedComponents = makeAnimated()

function CreateTask(props) {
  const [change, setChange] = useState(false)
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
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])

  const [taskName, setTaskName] = React.useState("")
  const [taskDescription, setTaskDescription] = React.useState("")
  const [taskNotes, setTaskNotes] = React.useState("")
  const [plan, setPlan] = React.useState("")

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
    var appAcronym = sessionStorage.getItem("appAcronym")
    const response = await Axios.post("http://localhost:8080/displayPlanDetails2", { appAcronym })
    console.log("displaying group array: !!!")
    console.log(response.data.data)
    setData(response.data.data)
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

  // function handleSubmit(newUser) {
  //   setChange(newUser)
  // }

  function openModal() {
    setIsOpen(true)
    // handleSubmit()
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00"
  }

  function closeModal() {
    setIsOpen(false)
    // handleSubmit()
  }
  let subtitle

  async function submit(e) {
    console.log("1")
    e.preventDefault()
    console.log("2")
    var appAcronym = sessionStorage.getItem("appAcronym")
    // var appAcronym = sessionStorage.getItem("appAcronym")
    const response2 = await Axios.post("http://localhost:8080/getAppRnumber", { appAcronym })
    // var appRnumber = sessionStorage.getItem("appRnumber")
    var appRnumber = response2.data[0].App_Rnumber
    console.log("Rnumber: ")
    console.log(appRnumber)
    var newAppRnumber = parseInt(appRnumber) + 1
    var taskId = appAcronym + "_" + newAppRnumber
    var taskCreator = sessionStorage.getItem("username")
    console.log("3")
    const response = await Axios.post("http://localhost:8080/createTask", { taskName, taskDescription, taskNotes, taskId, appRnumber, taskCreator, appAcronym, newAppRnumber, plan })
    console.log("4")
    // if (response.data) {
    if (response.data.message == "Task Created") {
      setSuccess("success")

      console.log("Task successfully created")
      console.log(response.data)
      props.onSubmit(count)
      setCount(count + 1)

      document.getElementById("create-task-name").value = ""
      document.getElementById("create-task-description").value = ""
      document.getElementById("create-task-plan").value = ""
      document.getElementById("create-task-notes").value = ""

      setTaskName("")
      setTaskDescription("")
      setTaskNotes("")
      setPlan("")
      // { value: "", label: "" }
      setSuccess("success")

      // closeModal()
      // e.target.reset()

      // openModal()

      // setMessage(response.data.message)
      // setOpen(true)
    } else if (response.data.message == "Task Name cannot be empty") {
      setSuccess("error")
      // console.log(response.data)
    } else if (response.data.message == "Description cannot be empty") {
      setSuccess("error")
      // console.log(response.data)
    } else {
      console.log("Error")
      setSuccess("error")
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
    loadData()
  }, [props.change])
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
          <div style={{ width: "1000px", margin: "auto" }}>
            <h2 ref={_subtitle => (subtitle = _subtitle)}>Create Task</h2>
            {/* <div>Enter New Group Name!!!</div> */}
            {/* <button onClick={closeModal}>close</button> */}
            <form>
              <p style={{ display: "table-row" }}>
                <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
                  Application Name:
                </label>
                <input value={sessionStorage.getItem("appAcronym")} disabled style={{ display: "table-cell", marginLeft: "5px" }} />
                <br />
              </p>
              <p style={{ display: "table-row" }}>
                <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
                  Task Name:
                </label>
                <input id="create-task-name" onChange={e => setTaskName(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} />
                <br />
              </p>
              <p style={{ display: "table-row" }}>
                <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
                  Description:
                </label>
                <TextareaAutosize id="create-task-description" maxRows={4} aria-label="maximum height" onChange={e => setTaskDescription(e.target.value)} style={{ width: "400%", display: "table-cell", marginLeft: "5px" }} />
                {/* <input onChange={e => setTaskDescription(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} /> */}
              </p>
              <p style={{ display: "table-row" }}>
                <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
                  Plan:
                </label>
                {/* <input onChange={e => setTaskNotes(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} /> */}
                <Select id="create-task-plan" value={plan.value} components={animatedComponents} options={data} autosize={true} onChange={e => setPlan(e.value)} />
              </p>
              <p style={{ display: "table-row" }}>
                <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
                  Task Notes:
                </label>
                <TextareaAutosize id="create-task-notes" maxRows={4} aria-label="maximum height" onChange={e => setTaskNotes(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} />
                {/* <input onChange={e => setTaskNotes(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} /> */}
                <br />
              </p>
              <div>
                <br></br>
              </div>

              <button onClick={submit}>Save</button>
            </form>
            <div>
              <br></br>
            </div>
            <button onClick={closeModal}>close</button>
          </div>
        </Modal>
      </form>
      <button className="py-1 mt-2 btn btn-lg btn-warning btn-block" onClick={openModal}>
        + Create Task
      </button>
    </div>
  )
}

export default CreateTask
