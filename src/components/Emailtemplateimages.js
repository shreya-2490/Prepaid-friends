import React from "react"
import calculator from "../assets/calculator.png"
import invoice from "../assets/invoice.svg"
import submit from "../assets/submit.png"
import reset from "../assets/reset.png"
import registration from "../assets/registeration.png"
import paymentcomplete from "../assets/paymentcomplete.png"
import linkedin from "../assets/linkedin@2x.png"
import facebook from "../assets/facebook@2x.png"
import email from "../assets/emailsupport.png"
import cancel from "../assets/cancel.png"

const Email = () => {
  return (
    <>

          <div >
              <img src={calculator}></img>
              <img src={invoice}></img>
              <img src={submit}></img>
              <img src={reset}></img>
              <img src={registration}></img>
              <img src={paymentcomplete}></img>
              <img src={linkedin}></img>
              <img src={facebook}></img>
              <img src={email}></img>
              <img src={cancel}></img>
      </div>
    </>
  )
}

export default Email
