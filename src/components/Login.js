import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import { Link } from "react-router-dom"

function Login() {
  return (
    <div className="wrapper bg-dark d-flex align-items-center justify-content-center w-100">
      <div className="login">
        <h2 className="mb-3">Login Form</h2>
        <form className="needs-validation">
          <div className="form-group was-validated mb-2">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input type="email" className="form-control" required></input>
            <div className="invalid-feedback">Please Enter your email</div>
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" required></input>
            <div className="invalid-feedback">Please Enter your password</div>
          </div>
          <div className="form-group form-check mb-2">
            <input type="checkbox" className="form-check-input"></input>
            <label htmlFor="checkbox" className="">
              {" "}
              Remember me
            </label>
          </div>
          <Link to="/">
            <button type="submit" className="btn btn-success w-100 mt-2">
              SIGN IN
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
