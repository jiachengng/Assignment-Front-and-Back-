import React, { useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderAdmin from "./HeaderAdmin"
import TasksContainer from "./TasksContainer"
import DisplayApplication from "./DisplayApplication"
import CreateUser from "./CreaterUser"
import CreateApplication from "./CreateApplication"

function Dashboard() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [groups, setGroups] = useState()
  const [loggedIn, setLoggedIn] = useState()
  const [isAdmin, setisAdmin] = useState()
  const navigate = useNavigate()
  const [users, setUsers] = useState(false)
  const [isPermitOpen, setisPermitOpen] = useState(false)
  const [isPermitToDo, setisPermitTodo] = useState(false)
  const [isPermitDone, setisPermitDone] = useState(false)
  const [isPermitDoing, setisPermitDoing] = useState(false)
  const [isPm, setisPm] = useState(false)
  const [isPl, setisPl] = useState(false)
  const [isPermitCreate, setisPermitCreate] = useState(false)

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   const response = await Axios.post("http://localhost:8080/updateUserDetails", { username, password, email })
  //   if (response.data) {
  //     console.log("User successfully updated")
  //     console.log(response.data)
  //   }
  // }

  // async function loadData5(username, token) {
  //   var appAcronym = sessionStorage.getItem("appAcronym")
  //   await Axios.post("http://localhost:8080/displayApplicationsDetails2", { appAcronym })
  //     .then(result => {
  //       console.log("load data 5 result")
  //       console.log(result.data)
  //       authUser(username, token, result.data)
  //     })
  //     .catch(err => {
  //       console.log("Load data5 error")
  //       console.log(err)
  //     })
  //   // setData5(response.data)
  //   // console.log("LoadData5: ")
  //   // console.log(response.data)
  //   // return response.data
  // }

  function handleSubmit(newUser) {
    console.log("supposedly count: " + newUser)
    setUsers(newUser)
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
    // Api call to authenticate and check group user
    try {
      // const response1 = await Axios.post("http://localhost:8080/displayApplicationsDetails2", { appAcronym })
      // var data5 = response1.data
      // console.log(data5)
      const response = await Axios.post("http://localhost:8080/authUser2", { username, token })

      setLoggedIn(response.data.login)
      setisAdmin(response.data.isAdmin)
      setUsername(response.data.username)

      // setisPermitOpen(response.data.isOpen)
      // setisPermitTodo(response.data.isToDo)
      // setisPermitDoing(response.data.isDoing)
      // setisPermitDone(response.data.isDone)
      // setisPermitCreate(response.data.isCreate)
      setisPl(response.data.isPl)
      setisPm(response.data.isPm)
      console.log("IS PL: ")
      console.log(response.data.isPl)
      console.log("IS PM: ")
      console.log(response.data.isPm)
      // console.log("IS CREATE: ")
      // console.log(response.data.isCreate)

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

  async function loadData(username) {
    const response = await Axios.post("http://localhost:8080/displayOneUserDetails", { username })
    setData(response.data)
    console.log("Username2: " + username)
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
    console.log("==============================")
    // var username1 = sessionStorage.getItem("username")
    // setUsername(username1)
    // const usernamex = sessionStorage.getItem("username")
    const username = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token")
    console.log("AUTH USER NOW")
    authUser(username, token)
    setUsername(sessionStorage.getItem("username"))
    console.log("Username1: " + sessionStorage.getItem("username"))
    loadData(sessionStorage.getItem("username"))
    loadData2(sessionStorage.getItem("username"))
    // loadData5(username, token)
  }, [])

  return (
    <div>
      {isAdmin ? <HeaderAdmin /> : <HeaderLoggedIn />}
      <Page title="Home" wide="True">
        <div className="row">
          {/* <TasksContainer /> */}
          <div className="col-lg-9 py-3 py-md-5 py-lg-2">
            <DisplayApplication users={users} onSubmit={handleSubmit} />
          </div>
          <div className="col-lg-3 pl-lg-5 py-3 py-md-5 pb-3 py-lg-1">
            {/* <CreateUser onSubmit={handleSubmit} /> */}
            {isPl ? <CreateApplication onSubmit={handleSubmit} /> : null}
          </div>
        </div>
      </Page>
    </div>
  )
}

export default Dashboard
