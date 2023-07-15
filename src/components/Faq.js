import React from "react"
import "./Faq.css"
import { Collapse, Divider } from "antd"
const { Panel } = Collapse

function Faq() {
  return (
    <div className="Faq-main">
      <div className="Faq-inner">
        <div className="Faq-title">FAQs</div>
        <div className="Accordion">
          <Divider orientation="center"></Divider>
          <Collapse bordered={false}>
            <Panel header="How does the prepaid card work?" key="1">
              <p>
                Our prepaid card allows you to purchase it using
                cryptocurrencies such as Bitcoin (BTC) and then load it with
                your desired amount. You can then spend the loaded value in
                dollars, just like any regular prepaid card.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel
              header="Which cryptocurrencies are accepted for purchasing the prepaid card?"
              key="2"
            >
              <p>
                Currently, we accept Bitcoin (BTC) as the primary cryptocurrency
                for purchasing our prepaid cards. However, we are actively
                exploring the integration of additional cryptocurrencies in the
                near future.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel
              header="How do I purchase a prepaid card using Bitcoin?"
              key="3"
            >
              <p>
                To purchase a prepaid card using Bitcoin, follow these simple
                steps:
                <ul style={{marginTop:"20px", textAlign:"left"}}>
                  <li>
                    Visit our website and select the desired prepaid card.
                  </li>
                  <li>Choose the BTC payment option during checkout.</li>
                  <li>
                    You will be provided with a unique BTC address to which you
                    can send the required amount of Bitcoin.
                  </li>
                  <li>
                    Once the transaction is confirmed on the blockchain, your
                    prepaid card will be issued and ready for loading.
                  </li>
                </ul>
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel
              header="Can I reload the prepaid card multiple times?"
              key="4"
            >
              <p>
                Absolutely! Our prepaid card is designed for multiple reloads,
                allowing you to add funds as needed. You can load the card with
                dollars using various payment methods, ensuring uninterrupted
                usage.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel
              header="Can I use the prepaid card for online and in-store purchases?"
              key="5"
            >
              <p>
                Yes, you can use the prepaid card for both online and in-store
                purchases, wherever Visa or Mastercard is accepted. It offers
                the same convenience and flexibility as a traditional payment
                card.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel
              header="What if I have unused funds on the prepaid card? Can I convert them back to Bitcoin?"
              key="6"
            >
              <p>
                At this time, we do not support direct conversion of unused
                dollar funds back into Bitcoin. However, you can continue to use
                the prepaid card for future purchases or withdraw the remaining
                balance through various available methods, subject to applicable
                fees.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel
              header="Are there any transaction fees associated with the prepaid card?"
              key="7"
            >
              <p>
                While specific fees may vary, our prepaid card may include
                standard transaction fees for certain types of transactions,
                such as ATM withdrawals or foreign currency conversions. We
                strive to maintain transparent fee structures, which you can
                review on our website or in the terms and conditions.
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default Faq
