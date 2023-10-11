import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import logo from "../assets/logo.png"
import { useNavigate, useLocation, useParams } from "react-router-dom"

import axios from "axios"
import { notification, message } from "antd"

function ResetPassword() {
  const [password, setNewpswrd] = useState("")
  const [password_confirmation, setConfirmpswrd] = useState("")
  const [api, contextHolder] = notification.useNotification()
  const nav = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { stoken } = useParams()
  console.log("Current URL location:", stoken)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/verify-reset-password-page-api/${stoken}`
        )
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [stoken])

  const handleReset = (e) => {
    e?.preventDefault()
    setIsLoading(true)
    axios
      ?.post("/api/reset-password-api", {
        password,
        password_confirmation,
        stoken,
      })
      ?.then((res) => {
        console.log(res)
        if (res.data.status === "success") {
          notification.success({
            message: "Success",
            description: "Password reset successfully",
          })
          nav("/login")
        } else {
          message.error(
            "Something went wrong! Token Expired. Please try again."
          )
        }
      })
      .catch((error) => {
        console.error("API Error:", error)
        message.error(
          "API Error: An error occurred while processing your request."
        )
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
            <div className="form-group was-validated mb-2">
              <label htmlFor="newpswrd" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setNewpswrd(e?.target?.value)}
                rules={[
                  {
                    required: true,
                  },
                ]}
              ></input>
              <label htmlFor="confirmpswrd" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfirmpswrd(e?.target?.value)}
                rules={[
                  {
                    required: true,
                  },
                ]}
              ></input>
              <div className="invalid-feedback">Please Enter your email</div>
            </div>
            <button
              type="submit"
              onClick={handleReset}
              className="btn  w-100 mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
