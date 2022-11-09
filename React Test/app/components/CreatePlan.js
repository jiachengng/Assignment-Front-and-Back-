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
import { BlockPicker } from "react-color"
import Calendar from "react-select-date"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const animatedComponents = makeAnimated()

function CreatePlan(props) {
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

  const [planName, setPlanName] = React.useState("")
  const [planStartDate, setPlanStartDate] = React.useState("")
  const [planEndDate, setPlanEndDate] = React.useState("")
  const [appColor, setAppColor] = useState("#37d67a")

  const loadData2 = async () => {
    const response = await Axios.post("http://localhost:8080/displayPlanDetails")
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
    const response = await Axios.get("http://localhost:8080/displayPlanDetails")
    // const rows = response.data
    // console.log("HELLO")
  }

  const customStyles = {
    content: {
      bottom: "auto"
    }
  }

  // function hndleChange() {} color => {
  //   this.setState({ color: color.rgb })
  // }

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
    var appAcronym = sessionStorage.getItem("appAcronym")
    const response = await Axios.post("http://localhost:8080/createPlan", { planName, planStartDate, planEndDate, appAcronym, appColor })
    console.log("COLOR:")
    console.log(appColor)
    // if (response.data) {
    if (response.data.message == "Plan Created") {
      setSuccess("success")

      console.log("Plan successfully created")
      console.log(response.data)

      props.onSubmit(response)
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
  }, [])
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
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Create Plan</h2>
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
                Plan Name:
              </label>
              <input onChange={e => setPlanName(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} />
              <br />
            </p>
            <p style={{ display: "table-row" }}>
              <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
                Start Date:
              </label>
              <input onChange={e => setPlanStartDate(e.target.value)} type="date" style={{ display: "table-cell", marginLeft: "5px" }} />
              {/* <Calendar onSelect={date => setPlanStartDate(date)} style={{ display: "table-cell", marginLeft: "5px" }} /> */}
              <br />
            </p>
            <p style={{ display: "table-row" }}>
              <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
                End Date:
              </label>
              <input onChange={e => setPlanEndDate(e.target.value)} type="date" style={{ display: "table-cell", marginLeft: "5px" }} />
              <br />
            </p>
            <p style={{ display: "table-row" }}>
              <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
                Color:
              </label>
              <BlockPicker
                color={appColor}
                onChange={color => {
                  setAppColor(color.hex)
                }}
              />
              <br />
            </p>
            <div></div>

            <button onClick={submit}>Save</button>
          </form>
          <div>
            <br></br>
          </div>
          <button onClick={closeModal}>close</button>
        </Modal>
      </form>
      <button className="py-1 mt-2 btn btn-lg btn-info btn-block" onClick={openModal}>
        + Create Plan
      </button>
    </div>
  )
}

export default CreatePlan
