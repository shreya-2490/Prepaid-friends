import React, { useState } from "react"
import "../styles/navbar.css"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import ham from "../assets/ham.png"
import { UserOutlined } from "@ant-design/icons"
function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [resmenu, setresmenu] = useState("none")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleCloseClick = () => {
    setIsCartOpen(false)
  }

  const addToCart = () => {
    setCartCount(cartCount + 1)
  }

  return (
    <div className="header">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="left">
        <div
          className="hamburg"
          onClick={() => {
            if (resmenu == "none") setresmenu("flex")
            else setresmenu("none")
          }}
        >
          <img src={ham}></img>
          <div className="navmenu" style={{ display: resmenu }}>
            <Link to="/">HOME</Link>
            <Link to="/bulkorder">BULK ORDERS</Link>
            <Link to="/contactus">CONTACT</Link>
            <Link to="/login">
              <span className="usernav">
                <UserOutlined />
                LOGIN
              </span>
            </Link>
          </div>
        </div>
        <div className="first-four-navigation">
          <Link to="/">HOME</Link>
          <Link to="/bulkorder">BULK ORDERS</Link>
          <Link to="/">HOW IT WORKS</Link>
          <Link to="/contactus">CONTACT</Link>
          <Link to="/login">
            <span className="user">
              <UserOutlined />
              LOGIN
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
