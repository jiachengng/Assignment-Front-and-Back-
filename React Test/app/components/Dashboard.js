import React, { useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderAdmin from "./HeaderAdmin"

function Dashboard() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [groups, setGroups] = useState()
  const [loggedIn, setLoggedIn] = useState()
  const [isAdmin, setisAdmin] = useState()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await Axios.post("http://localhost:8080/updateUserDetails", { username, password, email })
    if (response.data) {
      console.log("User successfully updated")
      console.log(response.data)
    }
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
    try {
      const response = await Axios.post("http://localhost:8080/authUser", { username, token })
      setLoggedIn(response.data.login)
      setisAdmin(response.data.isAdmin)
      setUsername(response.data.username)
      // if (!loggedIn) {
      if (response.data.login !== true) {
        console.log(response.data.login)
        console.log("NOT LOGGED IN!!!!!!!!!!!")
        sessionStorage.clear()
        navigate("/")
      } else {
        console.log(response.data.login)
        console.log("IS LOGGED IN!!!!!!!!!!!!")
      }
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
  }, [])

  return (
    <div>
      {isAdmin ? <HeaderAdmin /> : <HeaderLoggedIn />}
      <Page title="Home" wide="True"></Page>
    </div>
  )
}

export default Dashboard
