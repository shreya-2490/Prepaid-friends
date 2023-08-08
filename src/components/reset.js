import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { notification } from "antd"
import { useCookies } from "react-cookie";

function Reset() {
  const [password, setNewpswrd] = useState("")
  const [password_confirmation, setConfirmpswrd] = useState("")
  const [api, contextHolder] = notification.useNotification()
  const nav = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [cookies, setCookie] = useCookies(["pfAuthToken"])
  const [formSubmitted, setFormSubmitted] = useState(false) // New state for form submission

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (password === "") {
      setFormSubmitted(true) // Set formSubmitted to true on submission
      return api.error({
        message: "Password Error",
        description: "Password should not be empty.",
      })
    }
    if (password === password_confirmation) {
      return api.error({
        message: "Password Error",
        description:
          "New password should be different from the current password.",
      })
    }

    setIsLoading(true)
    axios
      .post(
        "/change-password-api",
        {
          password,
          password_confirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.pfAuthToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        if (res.data.status === "success") {
          notification.success({
            message: "Success",
            description: "Password changed successfully",
          })
        } else {
          return api.error({
            message: "Something went wrong!",
            description: "Token Expired. Please try again.",
          })
        }
      })
      .finally(() => setIsLoading(false))
  }

  const handlelogoClick = () => {
    nav("/front-demo/dashboard")
  }

  return (
    <>
      {contextHolder}
      <div className="d-flex align-items-center justify-content-center w-100">
     
        <div className="login">
          <h2 className="mb-4 login-heading">Change Password</h2>
          <form className="needs-validation">
            <div className="form-group mb-2">
              <label htmlFor="newpswrd" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setNewpswrd(e.target.value)}
                value={password}
                required
              ></input>
              {formSubmitted && password === "" && (
                <div className="invalid-feedback">
                  Please fill in your password.
                </div>
              )}
            </div>
            <div className="form-group mb-2">
              <label htmlFor="confirmpswrd" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfirmpswrd(e.target.value)}
                value={password_confirmation}
                required
              ></input>
            </div>
            <button
              type="button"
              onClick={handleChangePassword}
              className="btn w-100 mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Reset
