import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { notification } from "antd";

function ForgetPassword() { 
  const [email, setEmail] = useState("")
  const [api, contextHolder] = notification.useNotification()
  const nav = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleForget = (e) => {
    e?.preventDefault()
    setIsLoading(true)
    axios
      ?.post("/forgot-password-api", {
        email,
      })
      ?.then((res) => {
        console.log(res)
        if (res.data.status=== "success") {
          notification.success({
            message: "Success",
            description:
              "Password reset link sent to your email",
          })
        } else {
          return api.error({
            message: `Something went wrong!`,
            description: "Email is required or Email is not registered with us",
          })
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      {contextHolder}
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <img src={logo} className="login-logo" alt="Logo"></img>
      <div className="login">
        <h2 className="mb-4 login-heading">Forgot Password</h2>
        <form className="needs-validation">
          <div className="form-group was-validated mb-2">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e?.target?.value)}
              required
            ></input>
            <div className="invalid-feedback">Please Enter your email</div>
          </div>
          <button
            type="submit"
            onClick={handleForget}
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
