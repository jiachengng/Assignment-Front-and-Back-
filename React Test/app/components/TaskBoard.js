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
import Modal from "react-modal"
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import { Card, CardActions, CardContent, CardMedia, Typography, Container, Grid, Avatar } from "@material-ui/core"
import TextareaAutosize from "@mui/base/TextareaAutosize"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const animatedComponents = makeAnimated()

function TaskBoard(props) {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [data4, setData4] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [defaultGroupsCreate, setDefaultGroupsCreate] = useState([])
  const [defaultGroupsOpen, setDefaultGroupsOpen] = useState([])
  const [defaultGroupsToDo, setDefaultGroupsToDo] = useState([])
  const [defaultGroupsDoing, setDefaultGroupsDoing] = useState([])
  const [defaultGroupsDone, setDefaultGroupsDone] = useState([])
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
  const [modalIsOpen, setIsOpen] = React.useState(false)

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

  const [taskId, settaskId] = React.useState("")
  const [taskName, settaskName] = React.useState("")
  const [taskDescription, settaskDescription] = React.useState("")
  const [newtaskDescription, setnewtaskDescription] = React.useState("")
  const [newtaskNotes, setnewtaskNotes] = React.useState("")
  const [taskNotes, settaskNotes] = React.useState("")
  const [taskPlan, settaskPlan] = React.useState("")
  const [defaultPlan, setDefaultPlan] = React.useState([])
  const [taskAppAcronym, settaskAppAcronym] = React.useState("")
  const [taskState, settaskState] = React.useState("")
  const [taskCreator, settaskCreator] = React.useState("")
  const [taskOwner, settaskOwner] = React.useState("")
  const [taskCreateDate, settaskCreateDate] = React.useState("")

  const [task, setTask] = React.useState()

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
    const response = await Axios.post("http://localhost:8080/displayTaskDetails")
    setData(response.data)
    console.log(response.data)
    // const rows = response.data
    // console.log("HELLO")
  }
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
  const loadData3 = async () => {
    var appAcronym = sessionStorage.getItem("appAcronym")
    const response = await Axios.post("http://localhost:8080/displayPlanDetails2", { appAcronym })
    console.log(response.data)
    setData3(response.data.data)
    // const rows = response.data
    // console.log("HELLO")
  }

  const loadData4 = async () => {
    var appAcronym = sessionStorage.getItem("appAcronym")
    const response = await Axios.post("http://localhost:8080/displayPlanDetails3", { appAcronym })
    console.log("displaying plan array: !!!")
    console.log(response.data.data)
    setData4(response.data.data)
    // const rows = response.data
    // console.log("HELLO")
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

  function manageApplicationButtonFunction(item) {
    console.log(item.Task_state)
    // setGroupname()
    openModal()
    settaskId(item.Task_id)
    settaskName(item.Task_name)
    settaskDescription(item.Task_description)
    settaskNotes(item.Task_notes)
    var options = []
    var plan = new Object()
    plan.value = item.Task_plan
    plan.label = item.Task_plan
    options.push(plan)
    setDefaultPlan(options)
    settaskPlan(item.Task_plan)
    settaskAppAcronym(item.Task_app_Acronym)
    settaskState(item.Task_state)
    settaskCreator(item.Task_creator)
    settaskOwner(item.Task_owner)
    settaskCreateDate(item.Task_createDate)
  }
  function getPlanColor(taskPlanColor) {
    // const response = await Axios.post("http://localhost:8080/getPlanColor", { taskPlanColor })
    // console.log("Color for " + taskPlanColor)
    // console.log(response.data[0].Plan_color)
    // return response.data[0].Plan_color
    var color = ""
    for (let i = 0; i < data4.length; i++) {
      if (data4[i].name == taskPlanColor) {
        color = data4[i].color
      }
    }
    // console.log("Color for " + taskPlanColor + "!!!")
    // console.log(color)
    return color
  }

  async function shiftRightFunction(item) {
    console.log("Right Key Pressed")
    console.log(item.Task_state)
    // setGroupname()
    settaskId(item.Task_id)
    settaskName(item.Task_name)
    settaskDescription(item.Task_description)
    settaskNotes(item.Task_notes)
    settaskPlan(item.Task_plan)
    settaskAppAcronym(item.Task_app_Acronym)
    settaskState(item.Task_state)
    settaskCreator(item.Task_creator)
    settaskOwner(item.Task_owner)
    settaskCreateDate(item.Task_createDate)
    var taskid = item.Task_id
    var newState = ""

    if (item.Task_state == "open") {
      newState = "toDo"
    } else if (item.Task_state == "toDo") {
      newState = "doing"
    } else if (item.Task_state == "doing") {
      newState = "done"
    } else if (item.Task_state == "done") {
      newState = "close"
    } else {
      newState = item.Task_state
    }
    console.log("NewState: ")
    console.log(newState)
    const response = await Axios.post("http://localhost:8080/updateTask2", { taskid, newState })
    // if (response.data.updated === 1) {
    // console.log("22222222")
    console.log("Update Task Result:")
    console.log(response)
    if (response.data.message == "Task Updated") {
      console.log("Task table successfully Updated")
      setMessage(response.data.message)
      setOpen(true)
      props.onSubmit(response)
    } else {
      console.log("Error")
    }
  }
  async function shiftLeftFunction(item) {
    console.log("Left Key Pressed")
    console.log(item.Task_state)
    // setGroupname()
    settaskId(item.Task_id)
    settaskName(item.Task_name)
    settaskDescription(item.Task_description)
    settaskNotes(item.Task_notes)
    settaskPlan(item.Task_plan)
    settaskAppAcronym(item.Task_app_Acronym)
    settaskState(item.Task_state)
    settaskCreator(item.Task_creator)
    settaskOwner(item.Task_owner)
    settaskCreateDate(item.Task_createDate)
    var taskid = item.Task_id
    var newState = ""

    if (item.Task_state == "toDo") {
      newState = "open"
    } else if (item.Task_state == "doing") {
      newState = "toDo"
    } else if (item.Task_state == "done") {
      newState = "doing"
    } else if (item.Task_state == "close") {
      newState = "done"
    } else {
      newState = item.Task_state
    }
    console.log("NewState: ")
    console.log(newState)
    const response = await Axios.post("http://localhost:8080/updateTask2", { taskid, newState })
    // if (response.data.updated === 1) {
    // console.log("22222222")
    console.log("Update Task Result:")
    console.log(response)
    if (response.data.message == "Task Updated") {
      console.log("Task table successfully Updated")
      setMessage(response.data.message)
      setOpen(true)
      props.onSubmit(response)
    } else {
      console.log("Error")
    }
  }

  async function submit(e) {
    console.log("====####################====")
    console.log("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOSS")
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!")
    var userName = sessionStorage.getItem("username")
    // console.log(appPermitCreate)
    // e.preventDefault()
    // appAcronym = "Test"
    const response = await Axios.post("http://localhost:8080/updateTask", { taskId, taskName, taskDescription, newtaskDescription, taskNotes, newtaskNotes, taskState, taskPlan, userName })
    // if (response.data.updated === 1) {
    console.log("22222222")
    if (response.data.message == "Task Updated") {
      console.log("Task table successfully Updated")
      setMessage(response.data.message)
      setOpen(true)
    } else {
      console.log("Error")
    }
  }

  // function setDescription(x) {
  //   settaskAppAcronym(taskDescription)
  //   // setnewtaskDescription(x)
  // }

  async function authUser(username, token) {
    const response = await Axios.post("http://localhost:8080/authUser", { username, token })
    setLoggedIn(response.data.login)
    setisAdmin(response.data.isAdmin)
    console.log("printing is login and is admin")
    console.log(response.data.login)
    console.log(response.data.isAdmin)
  }

  const setSomethingNew = event => {
    setnewtaskDescription(event.target.value)
  }

  useEffect(() => {
    const username = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token")
    loadData() // ,
    loadData2()
    loadData3()
    loadData4()
    // authUser(username, token)
  }, [props.change])

  return (
    <div>
      <Modal name="ReactModal__Overlay" isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <h2 ref={_subtitle => (subtitle = _subtitle)}>View / Edit</h2>
        {/* <div>Enter New Group Name!!!</div> */}
        {/* <button onClick={closeModal}>close</button> */}
        <form>
          <p style={{ display: "table-row" }}>
            <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
              Task Id:
            </label>
            <input value={taskId} onChange={e => settaskId(e.target.value)} disabled style={{ display: "table-cell", marginLeft: "5px" }} />
            <br />
          </p>
          <p style={{ display: "table-row" }}>
            <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
              Task Name:
            </label>
            <input value={taskName} onChange={e => settaskName(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} />
            <br />
          </p>
          <p style={{ display: "table-row" }}>
            <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
              Description:
            </label>
            {/* <input value={taskDescription} onChange={e => setDescription(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} /> */}
            <input defaultValue={taskDescription} onChange={setSomethingNew} style={{ display: "table-cell", marginLeft: "5px" }} />
            {/* <input value={taskDescription} onChange={e => setnewtaskDescription(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} /> */}
            <br />
          </p>
          <p style={{ display: "table-row" }}>
            <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
              Task Notes:
            </label>
            {/* <input value={taskNotes} onChange={e => settaskNotes(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} /> */}
            <input onChange={e => setnewtaskNotes(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} />

            <br />
          </p>
          <p style={{ display: "table-row" }}>
            <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
              Task Plans:
            </label>
            {/* <input value={taskPlan} onChange={e => settaskPlan(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} /> */}
            <Select components={animatedComponents} defaultValue={defaultPlan} options={data3} autosize={true} onChange={e => settaskPlan(e.value)} />
          </p>
          <p style={{ display: "table-row" }}>
            <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
              Task State:
            </label>
            <input value={taskState} onChange={e => settaskState(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} />
            <br />
          </p>
          <p style={{ display: "table-row" }}>
            <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
              Task Creator:
            </label>
            <input value={taskCreator} onChange={e => settaskCreator(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} />
            <br />
          </p>
          <p style={{ display: "table-row" }}>
            <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
              Task Owner:
            </label>
            <input value={taskOwner} onChange={e => settaskOwner(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} />
            <br />
          </p>
          <p style={{ display: "table-row" }}>
            <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
              Task Create Date:
            </label>
            <input value={taskCreateDate.split("T")[0]} onChange={e => settaskCreateDate(e.target.value)} style={{ display: "table-cell", marginLeft: "5px" }} />
            <br />
          </p>
          <label htmlFor="username-register" className="text-muted mb-1" style={{ display: "table-cell", textAlign: "right" }}>
            Note Audit:
          </label>
          <TextareaAutosize maxRows={4} aria-label="maximum height" placeholder="Maximum 4 rows" defaultValue={taskNotes} style={{ width: 345 }} />
          <div>
            <br></br>
          </div>

          <button onClick={submit}>Save</button>
        </form>
        <div>{/* <br></br> */}</div>
        <button onClick={closeModal}>close</button>
      </Modal>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={success} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {/* 
      <Container style={{ marginTop: "1em" }} maxWidth="xl"> */}
      {/* <Grid container spacing={0}> */}
      {/* <Grid item container alignItems="center" xs={3}>
            <Paper>
              <Grid item xs={2} alignItems="center">
                <Avatar>JD</Avatar>
              </Grid>
              <Grid item xs={6} alignItems="center">
                John Doe
              </Grid>
            </Paper>
          </Grid> */}
      <Grid container spacing={0}>
        <Grid item xs justifyContent="center" alignItems="center">
          <Paper justifyContent="center" alignItems="center">
            <div style={{ textAlign: "center" }}>
              <strong>Open</strong>
            </div>
          </Paper>
          {data.map((item, index) => {
            let planColor
            if (item.Task_state == "open" && item.Task_app_Acronym == sessionStorage.getItem("appAcronym")) {
              planColor = getPlanColor(item.Task_plan)
              //console.log("Color gotten: " + planColor)
              if (planColor != undefined) {
                return (
                  <Card xs={{ maxWidth: 345 }}>
                    {/* <CardContent style={{ padding: "0px", backgroundColor: "lightblue" }}> */}
                    <CardContent style={{ padding: "0px", backgroundColor: planColor }}>
                      {/* <CardContent style={{ padding: "0px", backgroundColor: "#ba68c8" }}> */}
                      <Typography gutterBottom variant="body2" component="div">
                        Task ID: {item.Task_id}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Task Name: {item.Task_name}
                        <br />
                        Owner: {item.Task_owner}
                        {/* Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica */}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* {false ? (
                      <div>
                        <Button style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowLeftIcon size="small" />}></Button>
                        <Button style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowRightIcon size="small" />}></Button>
                      </div>
                    ) : null} */}
                      <Button onClick={() => shiftLeftFunction(item)} style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowLeftIcon size="small" />}></Button>
                      <Button onClick={() => shiftRightFunction(item)} style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowRightIcon size="small" />}></Button>
                      <Button onClick={() => manageApplicationButtonFunction(item)} variant="contained" size="small" startIcon={<ReadMoreIcon />}></Button>
                    </CardActions>
                  </Card>
                )
              }
            }
          })}
        </Grid>

        <Grid item xs justifyContent="center" alignItems="center">
          <Paper justifyContent="center" alignItems="center">
            <div style={{ textAlign: "center" }}>
              <strong>To Do</strong>
            </div>
          </Paper>
          {data.map((item, index) => {
            if (item.Task_state == "toDo" && item.Task_app_Acronym == sessionStorage.getItem("appAcronym")) {
              return (
                <Card xs={{ maxWidth: 345 }}>
                  <CardContent style={{ padding: "0px", backgroundColor: getPlanColor(item.Task_plan) }}>
                    <Typography gutterBottom variant="body2" component="div">
                      Task ID: {item.Task_id}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Task Name: {item.Task_name}
                      <br />
                      Owner: {item.Task_owner}
                      {/* Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* {false ? (
                      <div>
                        <Button style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowLeftIcon size="small" />}></Button>
                        <Button style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowRightIcon size="small" />}></Button>
                      </div>
                    ) : null} */}
                    <Button onClick={() => shiftLeftFunction(item)} style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowLeftIcon size="small" />}></Button>
                    <Button onClick={() => shiftRightFunction(item)} style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowRightIcon size="small" />}></Button>
                    <Button onClick={() => manageApplicationButtonFunction(item)} variant="contained" size="small" startIcon={<ReadMoreIcon />}></Button>
                  </CardActions>
                </Card>
              )
            }
          })}
        </Grid>
        <Grid item xs justifyContent="center" alignItems="center">
          <Paper justifyContent="center" alignItems="center">
            <div style={{ textAlign: "center" }}>
              <strong>Doing</strong>
            </div>
          </Paper>
          {data.map((item, index) => {
            if (item.Task_state == "doing" && item.Task_app_Acronym == sessionStorage.getItem("appAcronym")) {
              return (
                <Card xs={{ maxWidth: 345 }}>
                  <CardContent style={{ padding: "0px", backgroundColor: getPlanColor(item.Task_plan) }}>
                    <Typography gutterBottom variant="body2" component="div">
                      Task ID: {item.Task_id}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Task Name: {item.Task_name}
                      <br />
                      Owner: {item.Task_owner}
                      {/* Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* {false ? (
                      <div>
                        <Button style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowLeftIcon size="small" />}></Button>
                        <Button style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowRightIcon size="small" />}></Button>
                      </div>
                    ) : null} */}
                    <Button onClick={() => shiftLeftFunction(item)} style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowLeftIcon size="small" />}></Button>
                    <Button onClick={() => shiftRightFunction(item)} style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowRightIcon size="small" />}></Button>
                    <Button onClick={() => manageApplicationButtonFunction(item)} variant="contained" size="small" startIcon={<ReadMoreIcon />}></Button>
                  </CardActions>
                </Card>
              )
            }
          })}
        </Grid>
        <Grid item xs justifyContent="center" alignItems="center">
          <Paper justifyContent="center" alignItems="center">
            <div style={{ textAlign: "center" }}>
              <strong>Done</strong>
            </div>
          </Paper>
          {data.map((item, index) => {
            if (item.Task_state == "done" && item.Task_app_Acronym == sessionStorage.getItem("appAcronym")) {
              return (
                <Card xs={{ maxWidth: 345 }}>
                  <CardContent style={{ padding: "0px", backgroundColor: getPlanColor(item.Task_plan) }}>
                    <Typography gutterBottom variant="body2" component="div">
                      Task ID: {item.Task_id}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Task Name: {item.Task_name}
                      <br />
                      Owner: {item.Task_owner}
                      {/* Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* {false ? (
                      <div>
                        <Button style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowLeftIcon size="small" />}></Button>
                        <Button style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowRightIcon size="small" />}></Button>
                      </div>
                    ) : null} */}
                    <Button onClick={() => shiftLeftFunction(item)} style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowLeftIcon size="small" />}></Button>
                    <Button onClick={() => shiftRightFunction(item)} style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowRightIcon size="small" />}></Button>
                    <Button onClick={() => manageApplicationButtonFunction(item)} variant="contained" size="small" startIcon={<ReadMoreIcon />}></Button>
                  </CardActions>
                </Card>
              )
            }
          })}
        </Grid>
        <Grid item xs justifyContent="center" alignItems="center">
          <Paper justifyContent="center" alignItems="center">
            <div style={{ textAlign: "center" }}>
              <strong>Close</strong>
            </div>
          </Paper>
          {data.map((item, index) => {
            if (item.Task_state == "close" && item.Task_app_Acronym == sessionStorage.getItem("appAcronym")) {
              return (
                <Card xs={{ maxWidth: 345 }}>
                  <CardContent style={{ padding: "0px", backgroundColor: getPlanColor(item.Task_plan) }}>
                    <Typography gutterBottom variant="body2" component="div">
                      Task ID: {item.Task_id}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Task Name: {item.Task_name}
                      <br />
                      Owner: {item.Task_owner}
                      {/* Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* {false ? (
                      <div>
                        <Button style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowLeftIcon size="small" />}></Button>
                        <Button style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowRightIcon size="small" />}></Button>
                      </div>
                    ) : null} */}
                    <Button onClick={() => shiftLeftFunction(item)} style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowLeftIcon size="small" />}></Button>
                    <Button onClick={() => shiftRightFunction(item)} style={{ minWidth: "0", padding: "1px" }} color="primary" size="small" startIcon={<KeyboardDoubleArrowRightIcon size="small" />}></Button>
                    <Button onClick={() => manageApplicationButtonFunction(item)} variant="contained" size="small" startIcon={<ReadMoreIcon />}></Button>
                  </CardActions>
                </Card>
              )
            }
          })}
        </Grid>
      </Grid>
      {/* </Grid> */}
      {/* </Container> */}
    </div>
  )
}

export default TaskBoard
