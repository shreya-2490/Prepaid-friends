import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { message, notification } from "antd"
import validator from "validator"

function ForgetPassword() {
  const [email, setEmail] = useState("")
  const [api, contextHolder] = notification.useNotification()
  const nav = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleForget = (e) => {
    e?.preventDefault()
    setIsLoading(true)
    if (!email || !validator.isEmail(email)) {
      notification.error({
        message: "Error",
        description: "Please enter a valid email address",
      })
      setIsLoading(false)
      return
    }
    axios
      .post("/api/forgot-password-api", {
        email,
      })
      .then((res) => {
        console.log(res)
        if (res.data.status === "success") {
          notification.success({
            message: "Success",
            description: "Password reset link sent to your email",
          })
          nav("/login")
        } else {
          const errorMessage = res.data.message || "Something went wrong!"
          notification.error({
            message: "Error",
            description: errorMessage,
          })
        }
      })
      .catch((error) => {
        message.error(error.response.data.error)
      })
      .finally(() => setIsLoading(false))
  }

  const handlelogoClick = () => {
    nav("/login")
  }

  return (
    <>
      {contextHolder}
      <div className="wrapper d-flex align-items-center justify-content-center w-100">
        <img
          src={logo}
          className="login-logo"
          alt="Logo"
          onClick={handlelogoClick}
        ></img>
        <div className="login">
          <h2 className="mb-4 login-heading">Forgot Password</h2>
          <form className="needs-validation">
            <div className="form-group mb-2">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e?.target?.value)}
                required
              />
              <div className="invalid-feedback">Please Enter your email</div>
            </div>
            <button
              type="submit"
              onClick={handleForget}
              disabled={!email || isLoading}
              className="btn  w-100 mt-2"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
