import React from "react";
import error from "../assets/error.jpg"

const NotFound = () => {
  return (
    <div>
          <img src={error} alt="error 404 Not Found" style={{ height: "100vh" ,width:"100%"}}></img>
    </div>
  );
};

export default NotFound;
