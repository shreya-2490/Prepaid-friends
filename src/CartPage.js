import React, { useEffect, useState, useContext } from "react"
import { Card, Badge, Button, Modal } from "antd"
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { CartContext } from './CartContext';

import NavbarCart from "./NavbarCart"
import mastercard from "./assets/mastercard.jpg"
import "./CartPage.css"
import Ticker from "./ticker"

const Cart = ({ params }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const input1 = queryParams.get("usdValue")
  const input2 = queryParams.get("btcValue")
  const input3 = queryParams.get("selectedButton")
  const [selectedButton, setSelectedButton] = useState(input3)
  const [title, setTitle] = useState("NEW PREPAID MASTERCARD")
  const [usdValue, setUSDValue] = useState(input1)
  const [btcValue, setBtcValue] = useState(input2)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const { addToCart } = useContext(CartContext);

  const exchangeRate = 0.000038 // Example exchange rate, replace with the actual rate

  const handleUSDChange = (event) => {
    const usdInput = parseFloat(event.target.value)
    setUSDValue(usdInput)
    setBtcValue(usdInput * exchangeRate)
  }

  const handleAddToCart = () => {
    setIsSuccessModalVisible(true)
    addToCart();
    const queryParams = `?usdValue=${usdValue}&btcValue=${btcValue}&selectedButton=${selectedButton}`;
  
    setTimeout(() => {
      window.location.href = `/Checkout${queryParams}`;
    }, 2000); // Redirect after a delay of 1 second (adjust as needed)
  }

  const handleCloseModal = () => {
    setIsSuccessModalVisible(false)
  }

  useEffect(() => {
    setUSDValue(usdValue)
    setBtcValue(btcValue)
    setSelectedButton(selectedButton)
  }, [])

  return (
    <>
      <NavbarCart />
      <div className="cart-main">
        <div className="twocards-cart" style={{ overflowX: "hidden" }}>
          <div className="card1-cart">
            <Card
              className="custom-card-cart"
              title=""
              bordered={false}
              style={{
                width: 500,
                height: 300,
                borderRadius: "20px",
                margin: "90px 0px 0px 30px",
              }}
              headStyle={{ borderBottom: "none" }}
            >
              <img src={mastercard}></img>
            </Card>
          </div>
          <div className="card2-cart">
            <Card
              className="Contact-title"
              title={selectedButton == 1 ? "NEW PREPAID VISACARD" : title}
              bordered={false}
              headStyle={{ borderBottom: "none" }}
              style={{
                width: "638px",
                height: "410px",
                margin: "90px 0px 0px 30px",
              }}
            >
              <p className="custom-para2-cart">
                Introducing the Prepaid Mastercard - Your Ultimate Financial
                Freedom! Are you tired of the limitations and restrictions
                imposed by traditional banking systems? Look no further! Our
                Prepaid Mastercard is the perfect solution for individuals
                seeking financial independence and control. With our prepaid
                Mastercard, you can enjoy all the benefits of a credit or debit
                card without the hassle of credit checks or tying your finances
                to a bank account. It's a game-changer for those who value
                flexibility and convenience.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  margin: "-30px 40px",
                }}
              >
                <div style={{ margin: "50px 0px 0px 20px" }}>
                  <p>Enter Amount</p>
                  <div className="cart-input">
                    <input
                      id="numericInput"
                      inputmode="decimal"
                      placeholder="0.00"
                      name="quoteAmount"
                      autocomplete="off"
                      step="1"
                      max="9007199254740991"
                      type="number"
                      value={usdValue}
                      onChange={handleUSDChange}
                      className={btcValue.length > 10 ? "long-value" : ""}
                    />
                  </div>
                </div>
                <div style={{ margin: "50px 40px 0px 0px" }}>
                  <p>Expected BTC</p>
                  <div className="cart-input">
                    <input
                      id="numericInput"
                      inputmode="decimal"
                      placeholder="0.00"
                      name="quoteAmount"
                      autocomplete="off"
                      step="1"
                      max="9007199254740991"
                      type="number"
                      value={btcValue}
                      className={btcValue.length > 10 ? "long-value" : ""}
                    />
                  </div>
                </div>
              </div>{" "}
              <div className="cart-btn">
                <button onClick={handleAddToCart}>Add to Cart</button>
                <div className="success-modal">
                  <Modal
                    visible={isSuccessModalVisible}
                    onCancel={handleCloseModal}
                    footer={null}
                    closable={false}
                  >
                    <div style={{ textAlign: "center" }}>
                      <CheckCircleOutlined
                        style={{ fontSize: "64px", color: "#52c41a" }}
                      />
                      <h2>Success!</h2>
                      <Button type="primary" onClick={handleCloseModal}>
                        Close
                      </Button>
                    </div>
                  </Modal>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Ticker />
    </>
  )
}

export default Cart
