import React, { useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import HeaderLoggedIn from "./HeaderLoggedIn"

function HomeGuest(props) {
  const [username, setUsername] = useState()
  // const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    // try {
    const response = await Axios.post("http://localhost:8080/logIn", { username, password })
    if (response.data) {
      console.log("User successfully logged in")
      console.log(response.data)
      // setLoggedIn(true)
      // localStorage.setItem("appToken", true)
      // props.setLoggedIn(true)
      sessionStorage.setItem("token", response.data.token)
      console.log("Token: " + response.data.token)
      sessionStorage.setItem("username", response.data.username)
      console.log("Username: " + response.data.username)
      sessionStorage.getItem("username")
      // console.log("Incorrect username/password")
      // navigate(`/displayUser`)
      // navigate(`/editUser`)
      navigate(`/dashBoard`)
    } else {
      console.log("Incorrect username/password")
    }
    // }
    // catch (e) {
    //   console.log("There was an error!")
    // }
  }
  return (
    <div>
      <Header />
      <Page title="Home" wide="True">
        <div className="row align-items-center">
          {/* <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Remember Writing?!</h1>
          <p className="lead text-muted">Are you sick of short tweets and impersonal &ldquo;shared&rdquo; posts that are reminiscent of the late 90&rsquo;s email forwards? We believe getting back to actually writing is the key to enjoying the internet again.</p>
        </div> */}
          <div className="col-lg-5 pl-lg-5 pb-3 py-lg-10" style={{ margin: "auto" }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username-register" className="text-muted mb-1">
                  <small>Username</small>
                </label>
                <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder="Enter username" autocomplete="off" />
              </div>
              <div className="form-group">
                {/* <label for="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" required /> */}
              </div>
              <div className="form-group">
                <label for="password-register" className="text-muted mb-1">
                  <small>Password</small>
                </label>
                <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Enter Password" />
              </div>
              <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
                Login
              </button>
            </form>
          </div>
        </div>
      </Page>
    </div>
  )
}

export default HomeGuest
