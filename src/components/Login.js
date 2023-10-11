import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useCookies } from "react-cookie"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import { notification, message } from "antd"
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import { useAuth } from "../hooks/useAuth"

function Login() {
  const [api, contextHolder] = notification.useNotification()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const nav = useNavigate()
  const [_, setCookie] = useCookies(["pfAuthToken"])
  const [email, setEmail] = useState("")
  const [psw, setPsw] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const toggleShowPassword = (e) => {
    setShowPassword(!showPassword)
    e?.preventDefault()
  }

  const handleLogin = (e) => {
    e?.preventDefault()

    if (!email || !psw) {
      setLoginError(true)
      return
    }

    setIsLoading(true)
    setLoginError(false)

    axios
      .post("/api/login-user-api", {
        email,
        password: psw,
      })
      .then((res) => {
        console.log(res)
        if (res?.data?.token) {
          setCookie("pfAuthToken", res?.data?.token, { path: "/" })
          axios({
            url: "/api/user-detail-api",
            method: "get",
            headers: {
              Authorization: `Bearer ${res?.data?.token}`,
            },
          })
            .then((response) => {
              login({
                customerName: `${response?.data?.user?.first_name} ${response?.data?.user?.last_name}`,
                email: response?.data?.user?.email,
              })
            })
            .catch((err) => {
              console.log(err)
            })
          nav("/dashboard")
        } else {
          if (res?.data?.message === "Invalid email format") {
            message.error("Invalid Email. Please enter a valid email address.")
          } else if (res?.data?.message === "Email not found") {
            message.error(
              "Email Not Found. The provided email address was not found."
            )
          } else if (res?.data?.message === "Invalid password format") {
            message.error("Invalid Password. Please enter a valid password.")
          } else if (res?.data?.message === "Incorrect password") {
            message.error(
              "Incorrect Password. The provided password is incorrect."
            )
          } else {
            message.error(
              "Login Failed. Incorrect credentials. Please try again."
            )
          }
        }
      })
      .catch((error) => {
        console.error(error)
        message.error(error.response.data)
      })
      .finally(() => setIsLoading(false))
  }

  const handleForgetPassword = () => {
    nav(`/forgot-password`)
  }

  const handleRegister = () => {
    nav(`/register`)
  }

  return (
    <>
      {contextHolder}
      <div className="wrapper d-flex align-items-center justify-content-center w-100">
        <img src={logo} className="login-logo" alt="Logo"></img>
        <div className="login">
          <h2 className="mb-4 login-heading">Login to your Account</h2>
          <form className="needs-validation">
            <div className="form-group validate mb-2">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${
                  loginError && !email ? "is-invalid" : ""
                }`}
                onChange={(e) => setEmail(e?.target?.value)}
                required
              ></input>
              {loginError && !email && (
                <div className="invalid-feedback">Please Enter your email</div>
              )}
            </div>
            <div className="form-group  mb-2 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${loginError && !psw ? "" : ""}`}
                  onChange={(e) => setPsw(e?.target?.value)}
                  required
                />
                <div className="input-group-append">
                  <button className="toggle-pswrd" onClick={toggleShowPassword}>
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </button>
                </div>
              </div>
              {loginError && !email && (
                <div className="invalid-feedback">
                  Please Enter your password
                </div>
              )}
            </div>

            <div className="forget-register">
              <div className="form-group form-check mb-2">
                <input type="checkbox" className="form-check-input"></input>
                <label htmlFor="checkbox" className="remember">
                  {" "}
                  Remember me
                </label>
              </div>
              <span className="forget-password" onClick={handleForgetPassword}>
                Forgot Password?
              </span>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="btn w-100 mt-1"
              disabled={!email || !psw || isLoading}
            >
              SIGN IN
            </button>
            <div className="register-now">
              <span className="not-a-member">Not a Member? </span>{" "}
              <span className="register-link" onClick={handleRegister}>
                Register here!
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
