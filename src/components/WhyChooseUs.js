import React from "react"
import "./whyChoose.css"
import exchange from "./assets/exchange.gif"
import globe from "./assets/globe.gif"
import diagram from "./assets/diagram.gif"
import user from "./assets/user.gif"
import creditcard from "./assets/credit-card.gif"
import techsupport from "./assets/tech-support.gif"

import { Card } from "antd"
const { Meta } = Card

function Choose() {
  return (
    <div className="choose-section">
      <section>
        <div className="choose-box">
          <h1 className="choose-heading">Why Choose Us?</h1>
          <div className="choose-rows">
            <div className="choose-row1">
              <Card
                className="exchange-card"
                cover={<img alt="exchange" src={exchange} className="ex-pic" />}
              >
                <Meta
                  title="Seamless Crypto to Dollar Conversion"
                  description="Convert your Bitcoin (BTC) into dollars effortlessly with our prepaid card.
                Enjoy the flexibility of spending your crypto assets in the real world, just like traditional currency."
                />
              </Card>
              <Card
                className="exchange-card"
                cover={<img alt="globe" src={globe} className="ex-pic" />}
              >
                <Meta
                  title="Global Acceptance"
                  description="Use your prepaid card worldwide wherever Visa or Mastercard is accepted. Shop online, make in-store purchases, and even withdraw cash from ATMs hassle-free."
                />
              </Card>
              <Card
                className="exchange-card"
                cover={<img alt="diagram" src={diagram} className="ex-pic" />}
              >
                <Meta
                  title="Convenience and Flexibility"
                  description="Convert your Bitcoin (BTC) into dollars effortlessly with our prepaid card. Enjoy the flexibility of spending your crypto assets in the real world, just like traditional currency."
                />
              </Card>
            </div>
            <div className="choose-row2">
              <Card
                className="exchange-card"
                cover={<img alt="exchange" src={user} className="ex-pic" />}
              >
                <Meta
                  title="Secure and Reliable"
                  description="Rest assured that your transactions are secured with the latest encryption technology. Our prepaid card follows strict security measures, providing peace of mind for your crypto-to-dollar conversions."
                />
              </Card>
              <Card
                className="exchange-card"
                cover={<img alt="globe" src={creditcard} className="ex-pic" />}
              >
                <Meta
                  title="Instant Loading"
                  description="Load your prepaid card with dollars instantly, allowing you to access your funds immediately after the transaction. Say goodbye to waiting periods and enjoy the convenience of instant value transfer."
                />
              </Card>
              <Card
                className="exchange-card"
                cover={
                  <img alt="diagram" src={techsupport} className="ex-pic" />
                }
              >
                <Meta
                  title="Responsive Customer Support"
                  description="Our dedicated customer support team is ready to assist you with any queries or concerns you may have. We are committed to providing timely and reliable support for a seamless customer experience."
                />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Choose
