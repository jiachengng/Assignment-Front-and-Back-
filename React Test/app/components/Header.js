import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import Button from "@material-ui/core/Button"
import HeaderLoggedIn from "./HeaderLoggedIn"

function Header(props) {
  const [loggedIn, setLoggedIn] = useState()

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/dashboard" className="text-white">
            {" "}
            TMS{" "}
          </Link>
        </h4>
        <form className="mb-0 pt-2 pt-md-0">
          <div className="row align-items-center"></div>
        </form>
        {/* <HeaderLoggedOut /> */}
        {/* {props.loggedIn ? <HeaderLoggedIn setLoggedIn={props.setLoggedIn} /> : <HeaderLoggedOut setLoggedIn={props.setLoggedIn} />} */}
      </div>
    </header>
  )
}

export default Header
