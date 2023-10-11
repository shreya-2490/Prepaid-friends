import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies(["pfAuthToken"]);

  const checkUserToken = () => {
    if (!cookies?.pfAuthToken || cookies?.pfAuthToken === undefined) {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? children : null}</React.Fragment>;
};
export default ProtectedRoute;
