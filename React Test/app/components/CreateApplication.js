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
    // if (response.data) {
    if (response.data.message == "Application Created") {
      setSuccess("success")

      console.log("Application successfully created")
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
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Create Application</h2>
          {/* <div>Enter New Group Name!!!</div> */}
          {/* <button onClick={closeModal}>close</button> */}
          <form>
            <label htmlFor="username-register" className="text-muted mb-1">
              App Name:
            </label>
            <input style={{ marginLeft: "10px" }} onChange={e => setAppAcronym(e.target.value)} />
            <label style={{ marginLeft: "15px" }} htmlFor="username-register" className="text-muted mb-1">
              Description:
            </label>
            <input style={{ marginLeft: "10px" }} onChange={e => setAppDescription(e.target.value)} />
            <label style={{ marginLeft: "15px" }} htmlFor="username-register" className="text-muted mb-1">
              R.no:
            </label>
            <input style={{ marginLeft: "10px" }} onChange={e => setAppRnumber(e.target.value)} />
            <div>
              <br></br>
            </div>
            <label htmlFor="username-register" className="text-muted mb-1">
              Start:
            </label>
            <input onChange={e => setAppStartDate(e.target.value)} />
            <label htmlFor="username-register" className="text-muted mb-1">
              End:
            </label>
            <input onChange={e => setAppEndDate(e.target.value)} />
            <br></br>
            <label htmlFor="username-register" className="text-muted mb-1">
              Permit Open:
            </label>
            {/* <input value={appPermitOpen} onChange={e => setPermitOpen(e.target.value)} /> */}
            {/* <Select options={data2} onChange={e => setPermitOpen(e)} /> */}
            <Select components={animatedComponents} options={data2} autosize={true} onChange={e => setPermitOpen(e.value)} />
            <label htmlFor="username-register" className="text-muted mb-1">
              Permit ToDo:
            </label>
            {/* <input value={appPermitToDoList} onChange={e => setPermitToDo(e.target.value)} /> */}
            <Select components={animatedComponents} options={data2} autosize={true} onChange={e => setPermitToDo(e.value)} />
            <label htmlFor="username-register" className="text-muted mb-1">
              Permit Doing:
            </label>
            {/* <input value={appPermitDoing} onChange={e => setPermitDoing(e.target.value)} /> */}
            <Select components={animatedComponents} options={data2} autosize={true} onChange={e => setPermitDoing(e.value)} />
            <label htmlFor="username-register" className="text-muted mb-1">
              Permit Done:
            </label>
            {/* <input value={appPermitDone} onChange={e => setPermitDone(e.target.value)} /> */}
            <Select components={animatedComponents} options={data2} autosize={true} onChange={e => setPermitDone(e.value)} />
            <label htmlFor="username-register" className="text-muted mb-1">
              Permit Create:
            </label>
            <Select components={animatedComponents} options={data2} autosize={true} onChange={e => setPermitCreate(e.value)} />
            {/* <input value={appPermitCreate} onChange={e => setPermitCreate(e.target.value)} /> */}
            {/* <Select closeMenuOnSelect={false} components={animatedComponents} defaultValue={defaultGroupsCreate} isMulti options={data2} onChange={handleChange} /> */}
            <button onClick={submit}>Save</button>
          </form>
          <div>
            <br></br>
          </div>
          <button onClick={closeModal}>close</button>
        </Modal>
      </form>
      <button className="py-1 mt-2 btn btn-lg btn-warning btn-block" onClick={openModal}>
        Create Application
      </button>
    </div>
  )
}

export default CreateApplication