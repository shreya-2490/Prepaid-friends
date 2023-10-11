import React, { useState } from "react";
import "../styles/Register.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import NavbarCart from "./NavbarCart";
import { message, notification } from "antd";
import signup from "../assets/Sign Up.png";

const Register = () => {
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();
  const [cookies, setCookie] = useCookies(["pfAuthToken"]);
  const [first_name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [businessname, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateButtonDisabled = () => {
    if (first_name && last_name && email) {
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e?.preventDefault();
    if (updateButtonDisabled()) {
      return;
    }

    setIsLoading(true);
    axios
      .post("/api/register-user-api", {
        first_name,
        last_name,
        email,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          notification.success({
            message: "Success",
            description:
              "Success!! Your Password has been sent to your Email Address",
          });
          nav("/login");
        } else {
          api.error({
            message: "Something went wrong!",
            description: "Incorrect Credentials or Email Already in Use",
          });
        }
      })
      .catch((error) => {
        message.error(error.response.data.error)
      })
      .finally(() => setIsLoading(false))
  };

  return (
    <>
      {contextHolder}
      <NavbarCart />

      <div className="register-page">
        <div className="register-box">
          <div className="box1">
            <h1>Welcome!</h1>
            <img src={signup} alt="signup" className="register-img"></img>
          </div>

          <div className="box2">
            <h1>Create Account</h1>

            <input
              className="register-input"
              type="name"
              placeholder="First Name"
              required
              onChange={(e) => setName(e?.target?.value)}
            />
            <input
              className="register-input"
              type="lastname"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e?.target?.value)}
            />
            <input
              className="register-input"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e?.target?.value)}
            />
            <input
              className="register-input"
              type="businessname"
              placeholder="Business Name"
              onChange={(e) => setBusinessName(e?.target?.value)}
            />
            <button
              type="submit"
              className="btn"
              onClick={handleRegister}
              disabled={isLoading || updateButtonDisabled()}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
