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
import { Card, CardActions, CardContent, CardMedia, Typography, Container, Grid, Avatar } from "@material-ui/core"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const animatedComponents = makeAnimated()

function TaskBoard(props) {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
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
    const response = await Axios.post("http://localhost:8080/displayApplicationsDetails")
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
    // setGroupname()
    openModal()
    setAppAcronym(item.App_Acronym)
    setAppDescription(item.App_Description)
    setAppStartDate(item.App_startDate.split("T")[0])
    setAppEndDate(item.App_endDate.split("T")[0])
    setPermitOpen(item.App_permit_Open)
    setPermitToDo(item.App_permit_toDoList)
    setPermitDoing(item.App_permit_Doing)
    setPermitDone(item.App_permit_Done)
    setPermitCreate(item.App_permit_Create)
    setAppRnumber(item.App_Rnumber)

    var options1 = []
    var group1 = new Object()
    group1.value = item.App_permit_Create
    group1.label = item.App_permit_Create
    options1.push(group1)
    setDefaultGroupsCreate(options1)

    var options2 = []
    var group2 = new Object()
    group2.value = item.App_permit_Open
    group2.label = item.App_permit_Open
    options2.push(group2)
    setDefaultGroupsOpen(options2)

    var options3 = []
    var group3 = new Object()
    group3.value = item.App_permit_toDoList
    group3.label = item.App_permit_toDoList
    options3.push(group3)
    setDefaultGroupsToDo(options3)

    var options4 = []
    var group4 = new Object()
    group4.value = item.App_permit_Doing
    group4.label = item.App_permit_Doing
    options4.push(group4)
    setDefaultGroupsDoing(options4)

    var options5 = []
    var group5 = new Object()
    group5.value = item.App_permit_Done
    group5.label = item.App_permit_Done
    options5.push(group5)
    setDefaultGroupsDone(options5)
  }

  async function submit(e) {
    console.log("====####################====")
    console.log("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOSS")
    // console.log(appPermitCreate)
    // e.preventDefault()
    // appAcronym = "Test"
    const response = await Axios.post("http://localhost:8080/updateApplication", { appAcronym, appDescription, appRnumber, appStartDate, appEndDate, appPermitOpen, appPermitToDoList, appPermitDoing, appPermitDone, appPermitCreate })
    // if (response.data.updated === 1) {
    if (response.data.message == "Application Updated") {
      console.log("Application table successfully Updated")
      setMessage(response.data.message)
      setOpen(true)
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
    loadData() // ,
    loadData2()
    // authUser(username, token)
  }, [props.users])

  return (
    <div>
      <Modal name="ReactModal__Overlay" isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Application</h2>
        {/* <div>Enter New Group Name!!!</div> */}
        {/* <button onClick={closeModal}>close</button> */}
        <form>
          <label htmlFor="username-register" className="text-muted mb-1">
            App Name:
          </label>
          <input style={{ marginLeft: "10px" }} value={appAcronym} onChange={e => setAppAcronym(e.target.value)} />
          <label style={{ marginLeft: "15px" }} htmlFor="username-register" className="text-muted mb-1">
            Description:
          </label>
          <input style={{ marginLeft: "10px" }} value={appDescription} onChange={e => setAppDescription(e.target.value)} />
          <label style={{ marginLeft: "15px" }} htmlFor="username-register" className="text-muted mb-1">
            R.no:
          </label>
          <input style={{ marginLeft: "10px" }} value={appRnumber} onChange={e => setAppRnumber(e.target.value)} />
          <div>
            <br></br>
          </div>
          <label htmlFor="username-register" className="text-muted mb-1">
            Start:
          </label>
          <input value={appStartDate.split("T")[0]} onChange={e => setAppStartDate(e.target.value)} />
          <label htmlFor="username-register" className="text-muted mb-1">
            End:
          </label>
          <input value={appEndDate.split("T")[0]} onChange={e => setAppEndDate(e.target.value)} />
          <br></br>
          <label htmlFor="username-register" className="text-muted mb-1">
            Permit Open:
          </label>
          {/* <input value={appPermitOpen} onChange={e => setPermitOpen(e.target.value)} /> */}
          <Select components={animatedComponents} defaultValue={defaultGroupsOpen} options={data2} autosize={true} onChange={e => setPermitOpen(e.value)} />
          <label htmlFor="username-register" className="text-muted mb-1">
            Permit ToDo:
          </label>
          {/* <input value={appPermitToDoList} onChange={e => setPermitToDo(e.target.value)} /> */}
          <Select components={animatedComponents} defaultValue={defaultGroupsToDo} options={data2} autosize={true} onChange={e => setPermitToDo(e.value)} />
          <label htmlFor="username-register" className="text-muted mb-1">
            Permit Doing:
          </label>
          {/* <input value={appPermitDoing} onChange={e => setPermitDoing(e.target.value)} /> */}
          <Select components={animatedComponents} defaultValue={defaultGroupsDoing} options={data2} autosize={true} onChange={e => setPermitDoing(e.value)} />
          <label htmlFor="username-register" className="text-muted mb-1">
            Permit Done:
          </label>
          {/* <input value={appPermitDone} onChange={e => setPermitDone(e.target.value)} /> */}
          <Select components={animatedComponents} defaultValue={defaultGroupsDone} options={data2} autosize={true} onChange={e => setPermitDone(e.value)} />
          <label htmlFor="username-register" className="text-muted mb-1">
            Permit Create:
          </label>
          <Select components={animatedComponents} defaultValue={defaultGroupsCreate} options={data2} autosize={true} onChange={e => setPermitCreate(e.value)} />
          {/* <input value={appPermitCreate} onChange={e => setPermitCreate(e.target.value)} /> */}
          {/* <Select closeMenuOnSelect={false} components={animatedComponents} defaultValue={defaultGroupsCreate} isMulti options={data2} onChange={handleChange} /> */}
          <button onClick={submit}>Save</button>
        </form>
        <div>
          <br></br>
        </div>
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
            Open
          </Paper>
          <Card xs={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Sharez</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs>
          <Paper>To Do</Paper>
        </Grid>
        <Grid item xs>
          <Paper>Doing</Paper>
        </Grid>
        <Grid item xs>
          <Paper>Done</Paper>
        </Grid>
        <Grid item xs>
          <Paper>Close</Paper>
        </Grid>
      </Grid>
      {/* </Grid> */}
      {/* </Container> */}
    </div>
  )
}

export default TaskBoard
