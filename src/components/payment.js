import React from "react"
import { useState, useEffect } from "react"
import "../styles/payment.css"
import { Card, Button, Tooltip, Select, Space, Divider, Checkbox } from "antd"
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons"
import Scanner from "../assets/scanner.jpg"
import visa from "../assets/Visa.png"
import mastercard from "../assets/Mastercardcart.png"
import { useLocation } from "react-router-dom"
import Navbarlogo from "./Navbarlogo"
import axios from "axios"

function generateInvoiceId(length) {
  const characters = "0123456789";
  const charactersLength = characters.length;
  let invoiceId = "";

  for (let i = 0; i < length; i++) {
    invoiceId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return invoiceId;
}

const Payment = ({ email }) => {
  const calculateSubtotal = (totalAmount) => {
    const cardValue = 2.98
    const btcFee = (totalAmount + cardValue) * 0.01
    const subtotal = totalAmount + cardValue + btcFee
    return { btcFee, subtotal }
  }

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const input1 = queryParams.get("usdValue")
  const input2 = parseFloat(queryParams.get("btcValue"));
  const input3 = queryParams.get("selectedButton")
  const totalAmount = queryParams.get("totalAmount");
  const totalBTC = parseFloat(queryParams.get("totalBTC"));
  const [usdValue, setUSDValue] = useState(input1)
  const [btcValue, setBtcValue] = useState(input2)
  const { btcFee, subtotal } = calculateSubtotal(parseFloat(totalAmount))
  const [cardType, setCardType] = useState("")
  const [displaySelectedButton, setDisplaySelectedButton] = useState(false)
  const [selectedButton, setSelectedButton] = useState(input3 || "1" )

  useEffect(() => {
    setUSDValue(usdValue)
    setBtcValue(totalBTC)
    setSelectedButton(input3)
    setCardType(queryParams.get("cardType") || "")
    setDisplaySelectedButton(queryParams.get("selectedButton") !== "null")
  }, [])

  const displayCardQuantity = queryParams.get("cardQuantity");
  const displayLoadAmount = queryParams.get("loadAmount");
  const displaySubtotal = queryParams.get("subtotal");
  const displayEmail = queryParams.get("email");
  const exchangeRate = 0.000032 // Example exchange rate, replace with the actual rate
  const subtotalBTC = subtotal * exchangeRate
  const invoiceId = generateInvoiceId(10);
  const btcfeeforbulkorder = parseFloat(displaySubtotal) * 0.02;
  const totalbulkorder = (
    parseFloat(displaySubtotal) + btcfeeforbulkorder
  ).toFixed(2);
  const bulktotal = parseFloat(
    displayLoadAmount * displayCardQuantity * exchangeRate
  );
  const totalbulkamt = displayLoadAmount * displayCardQuantity;
  const formattedTotal =
    typeof totalbulkorder === "number"
      ? totalbulkorder.toFixed(2)
      : totalbulkorder;

  return (
    <>
      <Navbarlogo />
      <div className="checkout-main">
        <div className="twocards" style={{ overflowX: "hidden" }}>
          <div className="payment-card1">
            <Card
              className="custom-card"
              title="Order Details"
              bordered={false}
              style={{ width: 500, margin: "90px 0px 0px 70px" }}
              headStyle={{ borderBottom: "none" }}
            >
              <div className="order-details">
                <p>Email Address</p>
                <div className="email-div">
                  <p className="emailad">{displayEmail}</p>
                </div>
              </div>
              <div className="payment-details">
                <p>Payment Mode</p>
                <div className="email-div">
                  <p className="emailad">Bitcoin</p>
                </div>
              </div>
              <div className="payment-details">
                <p>Invoice Id</p>
                <div className="email-div">
                  <p className="emailad">{invoiceId}</p>
                </div>
              </div>
              <Divider className="custom-divider" />
              <div className="custom-upper-para-pay">
                <div>
                  <p className="swiggy">
                    {displaySelectedButton ? (
                      <div className="value">
                        {selectedButton === "1" ? (
                          <>
                            <div style={{ display: "flex" }}>
                              <img
                                src={visa}
                                alt="Visa"
                                className="visacardtype-img"
                              />
                              <p>Visa</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ display: "flex" }}>
                              <img
                                src={mastercard}
                                alt="MasterCard"
                                className="cardtype-img"
                              />
                              <p>MasterCard</p>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="value">
                        {cardType === "card1" ? (
                          <>
                            <div style={{ display: "flex" }}>
                              <img
                                src={visa}
                                alt="Visa"
                                className="visacardtype-img"
                              />
                              <p>Visa</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ display: "flex" }}>
                              <img
                                src={mastercard}
                                alt="MasterCard"
                                className="cardtype-img"
                              />
                              <p>MasterCard</p>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </p>
                  {queryParams.has("loadAmount") &&
                  queryParams.get("loadAmount") !== "null" ? (
                    <>
                      <p className="value">
                        Card Quantity: {queryParams.get("cardQuantity")}
                      </p>
                      <p className="value">
                        Load Amount: ${queryParams.get("loadAmount")}
                      </p>
                    </>
                  ) : (
                    <p className="value">${totalAmount}</p>
                  )}
                  {queryParams.has("multipletransaction") &&
                  queryParams.get("multipletransaction") === "Yes" ? (
                    <p>Multiple Use Allowance Fee: $5</p>
                  ) : null}
                  {queryParams.has("internationaltransaction") &&
                  queryParams.get("internationaltransaction") === "Yes" ? (
                    <p>International Use Allowance Fee: $8</p>
                  ) : null}
                  <p className="value">Prepaid Card Purchase Price: $2.98</p>
                  {!queryParams.has("loadAmount") ||
                  queryParams.get("loadAmount") === "null" ? (
                    <p className="value">
                      BTC Exchange Fee: ${btcFee.toFixed(2)}
                    </p>
                  ) : null}
                </div>
                <div className="se-box">
                  {queryParams.has("loadAmount") &&
                  queryParams.get("loadAmount") !== "null" ? (
                    <p className="BTC-payment">
                      {displayLoadAmount} x {displayCardQuantity} = $
                      {totalbulkamt}
                    </p>
                  ) : (
                    <p className="BTC-simplecard">{totalBTC} BTC</p>
                  )}
                </div>
              </div>
              {queryParams.has("loadAmount") &&
              queryParams.get("loadAmount") !== "null" ? (
                <p className="subtotal">SubTotal : {displaySubtotal}</p>
              ) : null}
              <Divider className="custom-divider2" />
              <p className="subtotal">Total</p>
              {queryParams.has("loadAmount") &&
              queryParams.get("loadAmount") !== "null" ? (
                <p className="fee-footer">
                  BTC Exchange Fee: ${btcfeeforbulkorder.toFixed(2)}
                </p>
              ) : null}
              <div className="custom-bottom-para pay-para">
                {queryParams.has("loadAmount") &&
                queryParams.get("loadAmount") !== "null" ? (
                  <p className="value">${formattedTotal}</p>
                ) : (
                  <p className="value">${subtotal.toFixed(2)}</p>
                )}
                {queryParams.has("loadAmount") &&
                queryParams.get("loadAmount") !== "null" ? (
                  <p className="BTC-total"> {bulktotal.toFixed(5)} BTC</p>
                ) : (
                  <p className="BTC-total"> {subtotalBTC.toFixed(5)} BTC</p>
                )}
              </div>
            </Card>
          </div>
          <div className="card2">
            <Card
              className="Contact-title"
              title="Pay with Bitcoin"
              bordered={false}
              headStyle={{ borderBottom: "none" }}
              style={{
                width: "638px",
                height: 800,
                margin: "90px 0px 0px 30px",
              }}
            >
              <div className="scanner-pic">
                <img src={Scanner} alt="Scanner" />
              </div>
              <div className="pay-h">
                <p className="pay-h1">Payment details</p>
                <p className="pay-h2">Payment unique address</p>
                <p className="pay-h3">
                  bc1q9ng8y63sc55aw6wr4mwjjs9zcj2v0dqz6s0k2r
                </p>
              </div>
              <div className="pay-h">
                <p className="pay-h4">Amount to pay</p>
                {queryParams.has("loadAmount") &&
                queryParams.get("loadAmount") !== "null" ? (
                  <p className="value"> {bulktotal.toFixed(5)} BTC</p>
                ) : (
                  <p className="value"> {subtotalBTC.toFixed(5)} BTC</p>
                )}
              </div>
              <div>
                <p className="pay-h6">Expires in</p>
              </div>
              <div className="adv">
                <a href="#" className="pay-adv">
                  Advanced options
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
