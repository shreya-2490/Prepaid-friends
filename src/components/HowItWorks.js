import React from "react"
import "../styles/HowItWorks.css"
import Navbarlogo from "./Navbarlogo"
import timeline from "../assets/Timeline.png"
import { Accordion } from "@prismane/core"
import Footer from "./Footer"
import NavbarCart from "./NavbarCart"

const HowItWorks = () => {
  return (
    <>
      <NavbarCart />
      <div className="outer-timeline">
        <div className="timeline">
          <h3 style={{fontWeight:"600"}}>Acquire Your Prepaid Card in 4 Simple Steps!</h3>
          <img src={timeline} alt="" />
        </div>
        <div className="questions">
          <h2>
            Frequently Asked <span>Questions</span>
          </h2>

          <Accordion>
            <Accordion.Item value="first">
              <Accordion.Control className="accordion-title">
                How does the prepaid card work?
                <Accordion.Icon />
              </Accordion.Control>
              <Accordion.Panel className="accordian-para">
                {" "}
                Our prepaid card allows you to purchase it using
                cryptocurrencies such as Bitcoin (BTC) and then load it with
                your desired amount. You can then spend the loaded value in
                dollars, just like any regular prepaid card.{" "}
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="second">
              <Accordion.Control className="accordion-title">
                Which cryptocurrencies are accepted for purchasing the prepaid
                card?
                <Accordion.Icon />
              </Accordion.Control>
              <Accordion.Panel  className="accordian-para">
                Currently, we accept Bitcoin (BTC) as the primary cryptocurrency
                for purchasing our prepaid cards. However, we are actively
                exploring the integration of additional cryptocurrencies in the
                near future.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="third">
              <Accordion.Control className="accordion-title">
                How do I purchase a prepaid card using Bitcoin?
                <Accordion.Icon />
              </Accordion.Control>
              <Accordion.Panel  className="accordian-para">
                To purchase a prepaid card using Bitcoin, follow these simple
                steps: • Visit our website and select the desired prepaid card.
                • Choose the BTC payment option during checkout. • You will be
                provided with a unique BTC address to which you can send the
                required amount of Bitcoin. • Once the transaction is confirmed
                on the blockchain, your prepaid card will be issued and ready
                for loading.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="fourth">
              <Accordion.Control className="accordion-title">
                Can I reload the prepaid card multiple times?
                <Accordion.Icon />
              </Accordion.Control >
              <Accordion.Panel  className="accordian-para">
                Absolutely! Our prepaid card is designed for multiple reloads,
                allowing you to add funds as needed. You can load the card with
                dollars using various payment methods, ensuring uninterrupted
                usage.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="fifth">
              <Accordion.Control className="accordion-title">
                Can I use the prepaid card for online and in-store purchases?
                <Accordion.Icon />
              </Accordion.Control>
              <Accordion.Panel  className="accordian-para">
                Yes, you can use the prepaid card for both online and in-store
                purchases, wherever Visa or Mastercard is accepted. It offers
                the same convenience and flexibility as a traditional payment
                card.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="sixth">
              <Accordion.Control className="accordion-title">
                What if I have unused funds on the prepaid card? Can I convert
                them back to Bitcoin?
                <Accordion.Icon />
              </Accordion.Control>
              <Accordion.Panel  className="accordian-para">
                At this time, we do not support direct conversion of unused
                dollar funds back into Bitcoin. However, you can continue to use
                the prepaid card for future purchases or withdraw the remaining
                balance through various available methods, subject to applicable
                fees.
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="seventh">
              <Accordion.Control className="accordion-title">
                Are there any transaction fees associated with the prepaid card?
                <Accordion.Icon />
              </Accordion.Control>
              <Accordion.Panel  className="accordian-para">
                While specific fees may vary, our prepaid card may include
                standard transaction fees for certain types of transactions,
                such as ATM withdrawals or foreign currency conversions. We
                strive to maintain transparent fee structures, which you can
                review on our website or in the terms and conditions.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default HowItWorks
