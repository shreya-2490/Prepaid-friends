import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

function NavbarLogo() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="headerlogo">
      <div className="logocheckout" onClick={goBack}>
        <LeftOutlined className="back-arrow" />
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
}

export default NavbarLogo;
