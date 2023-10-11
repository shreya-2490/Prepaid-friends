import React, { useState } from "react"
import { Divider, Space } from "antd"
import NavbarCart from "./NavbarCart"
import "../styles/dashboard.css"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import Reset from "./reset"
import Ordertable from "./Ordertable"
import { useAuth } from "../hooks/useAuth"

const Dashboard = () => {
  const nav = useNavigate()
  const { logout } = useAuth()
  const [cookies, setCookie, removeCookie] = useCookies(["pfAuthToken"])
  const [product, setProduct] = useState(true)
  const [reset, setReset] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState("products")

  const handleChangeproduct = () => {
    setProduct(true)
    setReset(false)
    setActiveMenuItem("products")
  }
  const handleChangePassword = () => {
    setActiveMenuItem("password")
    setReset(true)
    setProduct(false)
  }
  return (
    <>
      <NavbarCart />
      <div className="product-div">
        <div className="listing-design">
          <ul className="ul-list">
            <li className="user-profile">User Profile</li>
            <Divider />
            <li
              onClick={handleChangeproduct}
              className={activeMenuItem === "products" ? "active" : ""}
            >
              My Products
            </li>
            <Divider />
            <li
              onClick={handleChangePassword}
              className={activeMenuItem === "password" ? "active" : ""}
            >
              Change Password
            </li>
            <Divider />
            <li
              onClick={() => {
                removeCookie("pfAuthToken", { path: "/" })
                nav("/")
                logout()
              }}
              className="signout-li"
            >
              Sign Out
            </li>
          </ul>
        </div>
        <div className="searchbox-div">
          {product ? (
            <>
              <div className="ordertable">
                <Ordertable />
              </div>
            </>
          ) : (
            ""
          )}
          {reset ? <Reset /> : <></>}
        </div>
        <div style={{ textAlign: "right" }}>
          <Space direction="vertical"></Space>
        </div>
      </div>
    </>
  )
}

export default Dashboard
