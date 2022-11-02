import React, { useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//My components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Testing1 from "./components/Testing1"
import DisplayUser from "./components/DisplayUser"
import EditUser from "./components/EditUser"
import DashBoard from "./components/DashBoard"
import ManageUsers from "./components/ManageUsers"
import Application from "./components/Application"

function Main() {
  const [loggedIn, setLoggedIn] = useState()

  return (
    <BrowserRouter>
      {/* <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
      <Routes>
        <Route path="/" element={<HomeGuest />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/testing1" element={<Testing1 />} />
        <Route path="/displayUser" element={<DisplayUser />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        <Route path="/manageUsers" element={<ManageUsers />} />
        <Route path="/application" element={<Application />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
