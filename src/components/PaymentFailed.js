import React, { useEffect, useState } from "react"
import "../styles/Thankyou.css"
import Navbarlogo from "./Navbarlogo"
import checkmark from "../assets/cross.png"
import { useLocation, useNavigate } from "react-router-dom"

export const PaymentFailed = () => {
  const nav = useNavigate()
  const location = useLocation()
  const { orderNumber, email } = location?.state || {}
  const [isRedirecting, setIsRedirecting] = useState(true)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (isRedirecting) {
      const redirectionTimeout = setTimeout(() => {
        nav("/")
      }, 5000)
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
      return () => {
        clearTimeout(redirectionTimeout)
        clearInterval(countdownInterval)
      }
    }
  }, [isRedirecting, nav])

  const handleClickHome = () => {
    nav("/")
  }

  return (
    <>
      <Navbarlogo customGoBack={() => nav("/")} />
      <section className="full-page">
        <div className="thankyou">
          <div className="thankyou-inner">
            <div className="circle">
              <img
                src={checkmark}
                alt="checkmark"
                className="animated-checkmark cross-icon"
              />
              <h1>Payment Failed !</h1>
            </div>
            <div className="order">
              <div>
                <h3> Order No :</h3>
                <p>{orderNumber}</p>
              </div>
              <div>
                <h3> Email Address :</h3>
                <p>{email}</p>
              </div>
              <div>
                <h3>Payment Method :</h3>
                <p> Bitcoin (BTC)</p>
              </div>
            </div>

            <div className="details">
              We apologize, but it seems there was an issue with your payment.
              Please contact our customer care team for further assistance, and
              we'll be happy to help resolve the issue.
            </div>
            <button className="account" onClick={handleClickHome}>
              Back to HomePage
            </button>
            <br />
            {isRedirecting && (
              <p>
                Redirecting to the home page in {countdown} seconds...
                <strong>↺</strong>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
