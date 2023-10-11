import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { notification, message } from "antd"
import { useCookies } from "react-cookie"

function Reset() {
  const [password, setNewpswrd] = useState("")
  const [password_confirmation, setConfirmpswrd] = useState("")
  const [api, contextHolder] = notification.useNotification()
  const nav = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [cookies, setCookie] = useCookies(["pfAuthToken"])
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (password === "") {
      setFormSubmitted(true)
      message.error("Password Error: Password should not be empty.")
      return
    }

    setIsLoading(true)
    axios
      .post(
        "/api/change-password-api",
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
          message.error(
            "Something went wrong! Token Expired. Please try again."
          )
        }
      })
      .catch((error) => {
        message.error(error.response.data.error)
      })
      .finally(() => setIsLoading(false))
  }

  const handlelogoClick = () => {
    nav("/dashboard")
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
                New Password
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
                Confirm Password
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
              disabled={!password || !password_confirmation || isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Reset
