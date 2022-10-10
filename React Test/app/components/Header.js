import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"

function Header() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await Axios.post("http://localhost:8080/login", { username, password })
      console.log("Successfully Logged In")
    } catch (e) {
      console.log("Invalid username or password")
    }
  }

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            {" "}
            ComplexApp{" "}
          </Link>
        </h4>
        <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
          <div className="row align-items-center">
            <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
              <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
            </div>
            <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
              <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
            </div>
            <div className="col-md-auto">
              <button type="submit" className="btn btn-success btn-sm">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </header>
  )
}

export default Header
