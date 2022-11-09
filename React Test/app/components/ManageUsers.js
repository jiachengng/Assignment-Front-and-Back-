import React, { useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import HeaderLoggedIn from "./HeaderLoggedIn"
import CreateUser from "./CreaterUser"
import DisplayUser from "./DisplayUser"
import HeaderAdmin from "./HeaderAdmin"

function ManageUsers() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState()
  const [isAdmin, setisAdmin] = useState()
  const [users, setUsers] = useState(false)

  // const [data, setData] = useState([])

  // const loadData = async () => {
  //   const response = await Axios.get("http://localhost:8080/displayUserDetails")
  //   setData(response.data)
  //   // const rows = response.data
  //   // console.log("HELLO")
  // }
  function handleSubmit(newUser) {
    console.log("supposedly count: " + newUser)
    setUsers(newUser)
  }

  //const response = await Axios.post("http://localhost:8080/authUser", { username, token })
  async function authUser(username, token) {
    // Api call to authenticate and check group user
    try {
      const response = await Axios.post("http://localhost:8080/authUser2", { username, token })

      setLoggedIn(response.data.login)
      setisAdmin(response.data.isAdmin)
      setUsername(response.data.username)

      if (response.data.login !== true) {
        console.log(response.data.login)
        console.log("NOT LOGGED IN")
        sessionStorage.clear()
        navigate("/")
      }
      if (response.data.isAdmin !== true) {
        console.log(response.data.isAdmin)
        console.log("NOT ADMIN")
        sessionStorage.clear()
        navigate("/")
      }
    } catch (e) {
      console.log(e)
      navigate("/")
    }
  }

  useEffect(() => {
    const username = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token")
    authUser(username, token)
    // loadData()
  }, [])

  return (
    <div>
      <HeaderAdmin />
      <Page title="Home" wide="True">
        <div className="row">
          <div className="col-lg-9 py-3 py-md-5 py-lg-2">
            {/* <div> */}
            <DisplayUser users={users} onSubmit={handleSubmit} />
          </div>
          <div className="col-lg-3 pl-lg-5 py-3 py-md-5 pb-3 py-lg-1">
            <CreateUser onSubmit={handleSubmit} />
          </div>
        </div>
      </Page>
    </div>
  )
}

export default ManageUsers
