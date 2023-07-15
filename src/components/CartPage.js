import React, { useEffect, useState, useContext } from "react"
import { Card, Badge, Button, Modal } from "antd"
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { CartContext } from "./CartContext"
import {AiOutlineSafety} from "react-icons/ai"

import NavbarCart from "./NavbarCart"
import mastercard from "../assets/Mastercardcartpage.png"
import visacard from "../assets/Visacartpage.png"
import "../styles/CartPage.css"

const Cart = ({ handleAddToCart }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const input1 = queryParams.get("usdValue")
  const input2 = queryParams.get("btcValue")
  const input3 = queryParams.get("selectedButton")
  const [selectedButton, setSelectedButton] = useState(input3)
  const [title, setTitle] = useState("MASTER PREPAID CARD")
  const [usdValue, setUSDValue] = useState(input1)
  const [btcValue, setBtcValue] = useState(input2)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate()
  const exchangeRate = 0.000038 // Example exchange rate, replace with the actual rate

  const handleUSDChange = (event) => {
    const usdInput = parseFloat(event.target.value)
    setUSDValue(usdInput)
    setBtcValue(usdInput * exchangeRate)
  }
  const handleAddToCartClick = () => {
    addToCart({
      usdValue: usdValue,
      btcValue: btcValue,
      card: selectedButton,
    });
    setIsSuccessModalVisible(true);
  };
  

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
      <NavbarCart/>
      <div className="cart-main">
        <div className="twocards-cart" style={{ overflowX: "hidden" }}>
          <div className="card1-cart">
            <Card
              className="custom-card-cart"
              title=""
              bordered={false}
              style={{
                // width: 500,
                // height: 300,
                // borderRadius: "20px",
                margin: "96px 0px 0px 30px",
              }}
              headStyle={{ borderBottom: "none" }}
            >
              {selectedButton == 1 ? <img src={visacard}></img> : <img src={mastercard}></img>}
            </Card>
          </div>
          <div className="card2-cart">
            <Card
              className="Contact-title"
              title={selectedButton == 1 ? "VISA PREPAID CARD" : title}
              bordered={false}
              headStyle={{ borderBottom: "none" }}
              style={{
                width: "638px",
                height: "426px",
                margin: "93px 0px 0px 30px",
              }}
            >
              {selectedButton == 1 ? <p className="custom-para2-cart">
                Embrace the future of financial transactions with our Visa Prepaid
                Card, where the convenience of prepaid cards meets the power of
                Bitcoin. Simplify your payments, expand your purchasing
                possibilities, and enjoy the advantages of digital currency in a
                secure and sophisticated manner.<br/><br/>

                <span style={{color:"red"}}>NOTE: We will charge a flat rate card fee of $2.98 per card.</span>
              </p> :
                <p className="custom-para2-cart">Embrace the future of financial transactions with our Master Prepaid
                Card, where the convenience of prepaid cards meets the power of
                Bitcoin. Simplify your payments, expand your purchasing
                possibilities, and enjoy the advantages of digital currency in a
                  secure and sophisticated manner.<br /><br />
                  <span style={{color:"red"}}>NOTE: We will charge a flat rate card fee of $2.98 per card.</span>
                </p>}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "-30px 10px",
                }}
              >
                <div style={{ margin: "25px 0px 0px 20px" }}>
                  <p>Amount</p>
                  <div className="cart-input">
                    <input
                      id="numericInput"
                      inputmode="decimal"
                      placeholder="0.00"
                      name="quoteAmount"
                      autocomplete="on"
                      step="1"
                      max="9007199254740991"
                      type="number"
                      value={usdValue}
                      onChange={handleUSDChange}
                      readOnly
                      className={btcValue.length > 10 ? "long-value" : ""}
                    />
                  </div>
                </div>
                <div style={{ margin: "75px 40px 0px 18px" }}>
                  <p className="btcvalue">Expected BTC</p>
                  <div className="cart-input">
                    <p className="expected-value">{btcValue}</p>
                  </div>
                </div>
              </div>{" "}
              <div className="cart-btn">
                <button onClick={handleAddToCartClick}>Add to Cart</button>
                {/* <div className="success-modal">
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
                </div> */}
              </div>
              <div style={{display:"flex",  margin: "14px 10px 10px 28px"}}>
              <AiOutlineSafety style={{fontSize:"25px", color:"#41D195",marginRight:"10px" }}/><p style={{marginRight:"10px"}}>Simple Checkout Process</p>
              <AiOutlineSafety style={{fontSize:"25px", color:"#41D195",marginRight:"10px"}}/>  <p style={{marginRight:"10px"}}>Instant, Private, Safe</p>
              <AiOutlineSafety style={{fontSize:"25px", color:"#41D195",marginRight:"10px"}}/><p style={{marginRight:"10px"}}>Email Delivery</p></div>
             
            </Card>
          </div>
        </div>
      </div>
 
    </>
  )
}

export default Cart
