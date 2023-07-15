import React from "react"
import "./about.css"
import amount from "./assets/amount.gif"
import bitcoin from "./assets/bitcoin.gif"
import prepaid from "./assets/prepaid.gif"
import email from "./assets/email.gif"
import { ArrowRightOutlined } from "@ant-design/icons"
import { Card } from "antd"
const { Meta } = Card

function About() {
  return (
    <div className="about-main">
      <div className="about-header">
        <h1>How it works?</h1>
      </div>
      <div className="working-cards">
        <div className="card-with-arrow">
          <Card
            className="work-card1"
            cover={<img alt="amount" src={prepaid} className="wo-pic" />}
          >
            <Meta
              title="Enter Amount"
              description="Choose the desired amount you want to load onto your prepaid card. Select the value that aligns with your spending needs and financial preferences."
            />
          </Card>
          <div className="arrow">
            <ArrowRightOutlined />
          </div>
        </div>
        <div className="card-with-arrow">
          <Card
            className="work-card1"
            cover={<img alt="email" src={email} className="wo-pic" />}
          >
            <Meta
              title="Verify Email"
              description="Provide your email address for verification. We prioritize security and ensure a smooth user experience. Check your inbox for a verification link and click on it to confirm your email."
            />
          </Card>
          <div className="arrow">
            <ArrowRightOutlined />
          </div>
        </div>
        <div className="card-with-arrow">
          <Card
            className="work-card1"
            cover={<img alt="bitcoin" src={bitcoin} className="wo-pic" />}
          >
            <Meta
              title="Pay Via BTC"
              description="Pay for your prepaid card using Bitcoin (BTC). A unique BTC address will be generated for your transaction. Simply initiate the payment from your Bitcoin wallet by sending the exact amount to the provided address."
            />
          </Card>
          <div className="arrow">
            <ArrowRightOutlined />
          </div>
        </div>
        <div className="card-with-arrow">
          <Card
            className="work-card1"
            cover={<img alt="prepaid" src={amount} className="wo-pic" />}
          >
            <Meta
              title="Enjoy Your Prepaid Card"
              description="Congratulations! Your prepaid card will be issued once the BTC transaction is confirmed. You now have a convenient and versatile payment option. Use your prepaid card to shop online, make in-store purchases, or withdraw cash from ATMs wherever Visa or Mastercard is accepted."
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default About
