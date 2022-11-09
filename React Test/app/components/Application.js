import React, { useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import HeaderLoggedIn from "./HeaderLoggedIn"
import CreateUser from "./CreaterUser"
import DisplayUser from "./DisplayUser"
import HeaderAdmin from "./HeaderAdmin"
import Taskboard from "./Taskboard"
import CreateTask from "./CreateTask"
import CreatePlan from "./CreatePlan"
import { Card, CardActions, CardContent, CardMedia, Typography, Container, Grid, Avatar } from "@material-ui/core"

function Application() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState()
  const [isAdmin, setisAdmin] = useState()
  const [change, setChange] = useState(false)
  const [isPermitOpen, setisPermitOpen] = useState(false)
  const [isPermitToDo, setisPermitTodo] = useState(false)
  const [isPermitDone, setisPermitDone] = useState(false)
  const [isPermitDoing, setisPermitDoing] = useState(false)
  const [isPm, setisPm] = useState(false)
  const [isPl, setisPl] = useState(false)
  const [isPermitCreate, setisPermitCreate] = useState(false)

  const [data, setData] = useState([])

  // const [data, setData] = useState([])

  // const loadData = async () => {
  //   const response = await Axios.get("http://localhost:8080/displayUserDetails")
  //   setData(response.data)
  //   // const rows = response.data
  //   // console.log("HELLO")
  // }
  const loadData = async () => {
    const response = await Axios.post("http://localhost:8080/displayPlanDetails")
    setData(response.data)
  }
  async function loadData5(username, token) {
    var appAcronym = sessionStorage.getItem("appAcronym")
    await Axios.post("http://localhost:8080/displayApplicationsDetails2", { appAcronym })
      .then(result => {
        console.log("load data 5 result")
        console.log(result.data)
        authUser(username, token, result.data)
      })
      .catch(err => {
        console.log("Load data5 error")
        console.log(err)
      })
    // setData5(response.data)
    // console.log("LoadData5: ")
    // console.log(response.data)
    // return response.data
  }

  function handleSubmit(newUser) {
    console.log("supposedly count: " + newUser)
    setChange(newUser)
  }

  //const response = await Axios.post("http://localhost:8080/authUser", { username, token })
  async function authUser(username, token, result) {
    // Api call to authenticate and check group user
    try {
      // const response1 = await Axios.post("http://localhost:8080/displayApplicationsDetails2", { appAcronym })
      // var data5 = response1.data
      // console.log(data5)
      const response = await Axios.post("http://localhost:8080/authUser", { username, token, result })

      setLoggedIn(response.data.login)
      setisAdmin(response.data.isAdmin)
      setUsername(response.data.username)

      setisPermitOpen(response.data.isOpen)
      setisPermitTodo(response.data.isToDo)
      setisPermitDoing(response.data.isDoing)
      setisPermitDone(response.data.isDone)
      setisPermitCreate(response.data.isCreate)
      setisPl(response.data.isPl)
      setisPm(response.data.isPm)
      console.log("IS PL: ")
      console.log(response.data.isPl)
      console.log("IS PM: ")
      console.log(response.data.isPm)
      console.log("IS CREATE: ")
      console.log(response.data.isCreate)

      if (response.data.login !== true) {
        console.log(response.data.login)
        console.log("NOT LOGGED IN")
        sessionStorage.clear()
        navigate("/")
      }
      // if (response.data.isAdmin !== true) {
      //   console.log(response.data.isAdmin)
      //   console.log("NOT ADMIN")
      //   sessionStorage.clear()
      //   navigate("/")
      // }
    } catch (e) {
      console.log(e)
      navigate("/")
    }
  }

  useEffect(() => {
    const username = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token")
    // authUser(username, token)
    loadData5(username, token)
    loadData()
  }, [change])

  return (
    <div>
      {isAdmin ? <HeaderAdmin /> : <HeaderLoggedIn />}
      <Page title="Home" wide="True">
        <div className="row">
          <div className="col-lg-9 py-3 py-md-5 py-lg-2">
            {/* <div> */}
            <Taskboard change={change} onSubmit={handleSubmit} />
          </div>
          <div className="col-lg-3 pl-lg-5 py-3 py-md-5 pb-3 py-lg-1">
            {/* aa={sessionStorage.getItem("appAcronym") */}
            {/* props.aa */}
            {isPermitCreate ? <CreateTask change={change} onSubmit={handleSubmit} /> : null}
            {isPm ? <CreatePlan onSubmit={handleSubmit} /> : null}
            {console.log(data)}
            {data.map((item, index) => {
              if (item.Plan_app_Acronym == sessionStorage.getItem("appAcronym")) {
                return (
                  <Card xs={{ maxWidth: 345 }}>
                    <CardContent style={{ padding: "0px", backgroundColor: item.Plan_color }}>
                      <Typography gutterBottom variant="body2" component="div">
                        Plan ID: {item.Plan_MVP_name}
                      </Typography>
                    </CardContent>
                  </Card>
                )
              }
            })}
          </div>
        </div>
      </Page>
    </div>
  )
}

export default Application
