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

function CreateApplication(props) {
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

  const [appAcronym, setAppAcronym] = React.useState("")
  const [appDescription, setAppDescription] = React.useState("")
  const [appStartDate, setAppStartDate] = React.useState("")
  const [appEndDate, setAppEndDate] = React.useState("")
  const [appPermitOpen, setPermitOpen] = React.useState("")
  const [appPermitToDoList, setPermitToDo] = React.useState("")
  const [appPermitDoing, setPermitDoing] = React.useState("")
  const [appPermitDone, setPermitDone] = React.useState("")
  const [appPermitCreate, setPermitCreate] = React.useState("")
  const [appRnumber, setAppRnumber] = React.useState("")

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
    e.preventDefault()
    const response = await Axios.post("http://localhost:8080/createApplication", { appAcronym, appDescription, appRnumber, appStartDate, appEndDate, appPermitOpen, appPermitToDoList, appPermitDoing, appPermitDone, appPermitCreate })
    console.log("Create App")
    console.log(response)
    // if (response.data) {
    if (response.data.message == "Application Created") {
      setSuccess("success")

      console.log("Application successfully created")
      console.log(response.data)
      props.onSubmit(count)
      setCount(count + 1)
      closeModal()
      setAppAcronym("")
      setAppDescription("")
      setAppStartDate("")
      setAppEndDate("")
      setPermitOpen("")
      setPermitToDo("")
      setPermitDoing("")
      setPermitDone("")
      setPermitCreate("")
      setAppRnumber("")
      // setMessage(response.data.message)
      // setOpen(true)
    } else if (response.data.message == "Application Name cannot be empty") {
      setSuccess("error")
      // console.log(response.data)
    } else if (response.data.message == "Description cannot be empty") {
      setSuccess("error")
      // console.log(response.data)
    } else if (response.data.message == "Start Date cannot be empty") {
      setSuccess("error")
      // console.log(response.data)
    } else if (response.data.message == "End Date cannot be empty") {
      setSuccess("error")
      // console.log(response.data)
    } else if (response.data.message == "Please select all permission") {
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
    if (response.data.message == "Task Name cannot be empty") {
      console.log("Group successfully created")
      setSuccess("success")
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
      {/* <form action=""> */}
      <Modal name="ReactModal__Overlay" isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Create Application</h2>
        {/* <div>Enter New Group Name!!!</div> */}
        {/* <button onClick={closeModal}>close</button> */}
        <form>
          <label htmlFor="username-register" className="text-muted mb-1">
            App Name:
          </label>
          <input type="text" class="txtPost" style={{ marginLeft: "10px" }} onChange={e => setAppAcronym(e.target.value)} required />
          <label style={{ marginLeft: "10px" }} htmlFor="username-register" className="text-muted mb-1">
            Start:
          </label>
          <input style={{ marginLeft: "10px" }} type="date" onChange={e => setAppStartDate(e.target.value)} required />
          <label style={{ marginLeft: "10px" }} htmlFor="username-register" className="text-muted mb-1">
            End:
          </label>
          <input style={{ marginLeft: "10px" }} type="date" onChange={e => setAppEndDate(e.target.value)} required />
          {/* <label style={{ marginLeft: "15px" }} htmlFor="username-register" className="text-muted mb-1">
              Description:
            </label>
            <input style={{ marginLeft: "10px" }} onChange={e => setAppDescription(e.target.value)} /> */}
          <label style={{ marginLeft: "15px" }} htmlFor="username-register" className="text-muted mb-1">
            R.no:
          </label>
          <input style={{ marginLeft: "10px" }} type="number" min="0" step="1" onChange={e => setAppRnumber(e.target.value)} required onKeyDown={evt => (evt.key === "." && evt.preventDefault()) || (evt.key === "e" && evt.preventDefault()) || (evt.key === "-" && evt.preventDefault())} />
          <br />
          <label htmlFor="username-register" className="text-muted mb-1">
            Description:
          </label>
          {/* <input style={{ marginLeft: "10px" }} onChange={e => setAppDescription(e.target.value)} /> */}
          <TextareaAutosize maxRows={4} aria-label="maximum height" onChange={e => setAppDescription(e.target.value)} style={{ width: "100%", marginLeft: "10px" }} required />
          <div></div>

          <label htmlFor="username-register" className="text-muted mb-1">
            Permit Open:
          </label>
          {/* <input value={appPermitOpen} onChange={e => setPermitOpen(e.target.value)} /> */}
          {/* <Select options={data2} onChange={e => setPermitOpen(e)} /> */}
          <Select components={animatedComponents} options={data2} autosize={true} onChange={e => setPermitOpen(e.value)} required />
          <label htmlFor="username-register" className="text-muted mb-1">
            Permit ToDo:
          </label>
          {/* <input value={appPermitToDoList} onChange={e => setPermitToDo(e.target.value)} /> */}
          <Select components={animatedComponents} options={data2} autosize={true} onChange={e => setPermitToDo(e.value)} required />
          <label htmlFor="username-register" className="text-muted mb-1">
            Permit Doing:
          </label>
          {/* <input value={appPermitDoing} onChange={e => setPermitDoing(e.target.value)} /> */}
          <Select components={animatedComponents} options={data2} autosize={true} onChange={e => setPermitDoing(e.value)} required />
          <label htmlFor="username-register" className="text-muted mb-1">
            Permit Done:
          </label>
          {/* <input value={appPermitDone} onChange={e => setPermitDone(e.target.value)} /> */}
          <Select components={animatedComponents} options={data2} autosize={true} onChange={e => setPermitDone(e.value)} required />
          <label htmlFor="username-register" className="text-muted mb-1">
            Permit Create:
          </label>
          <Select components={animatedComponents} options={data2} autosize={true} onChange={e => setPermitCreate(e.value)} required />
          {/* <input value={appPermitCreate} onChange={e => setPermitCreate(e.target.value)} /> */}
          {/* <Select closeMenuOnSelect={false} components={animatedComponents} defaultValue={defaultGroupsCreate} isMulti options={data2} onChange={handleChange} /> */}
          <button type="submit" onClick={submit}>
            Save
          </button>
        </form>
        <div>
          <br></br>
        </div>
        <button onClick={closeModal}>close</button>
      </Modal>
      {/* </form> */}
      <button className="py-1 mt-2 btn btn-lg btn-warning btn-block" onClick={openModal}>
        Create Application
      </button>
    </div>
  )
}

export default CreateApplication
