import React from "react";
import "../styles/Wiretransfer.css";
import checkmark from "../assets/Checkmark.png";
import { useNavigate } from "react-router-dom";

export const WireTransfer = (props) => {
  const { email, customThankYouMessage } = props;
  const nav = useNavigate();

  const handleClickHome = () => {
    nav("/");
  };
  return (
    <>
      <section>
        <div className="wiretransfer">
          <div className="wiretransfer-inner">
            <div className="wiretransfer-circle">
              <img
                src={checkmark}
                alt="wiretransfer-checkmark"
                className="animated-checkmark"
              />
              <h1>Thank You for your purchase!</h1>
            </div>

            <div className="wiretransfer-order">
              {/* <div>
                <h3> Order No :</h3>
                <p> OD49937JKKD4690</p>
              </div> */}
              <div>
                <h3> Email Address :</h3>
                <p> {email}</p>
              </div>
              <div>
                <h3>Payment Method :</h3>
                <p> WireTransfer </p>
              </div>
            </div>

            <div className="wiretransfer-details">{customThankYouMessage}</div>
            <br />
            <button className="wiretransfer-account" onClick={handleClickHome}>
              Back to HomePage
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
