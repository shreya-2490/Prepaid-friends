import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

function NavbarLogo({ customGoBack }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="headerlogo">
      <div className="logocheckout" onClick={customGoBack || goBack}>
        <LeftOutlined className="back1-arrow" />
      </div>
      <Link to="/">
        <img src={logo} alt="Logo" className="logopayment" />
      </Link>
    </div>
  );
}

export default NavbarLogo;
