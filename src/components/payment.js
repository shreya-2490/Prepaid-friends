import React from "react"
import { useState, useEffect, useContext } from "react"
import "../styles/payment.css"
import { Card, Divider, QRCode, Skeleton } from "antd"
import visa from "../assets/Visacartpage.png"
import mastercard from "../assets/Mastercardcartpage.png"
import { useLocation, useNavigate } from "react-router-dom"
import Navbarlogo from "./Navbarlogo"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { usdToBTC } from "../utils/helper"
import { WireTransfer } from "./WireTransfer-thanyoupage"
import useInterval from "../hooks/useInterval"
import { useCookies } from "react-cookie"
import { AuthContext } from "../context/auth-context"
const defaultWireOrderSuccessMessage = `Your order has been placed successfully. Please check your email
for receipt confirmation and instructions. Thank You!`

const Payment = () => {
  const nav = useNavigate()
  const [btcRate, setBTCRate] = useState(null)
  const [wireOrderSuccessMessage, setWireOrderSuccessMessage] = useState(
    defaultWireOrderSuccessMessage
  )
  const location = useLocation()
  const { email, orderType, data } = location?.state || {}
  const queryParams = new URLSearchParams(location.search)
  const input1 = queryParams.get("usdValue")
  const [usdValue, setUSDValue] = useState(input1)
  const isBulkOrder = orderType === "bulk-order"
  const [cookies] = useCookies(["pfAuthToken"])
  const { user } = useContext(AuthContext)

  const [btcRateLoading, setBTCRateLoading] = useState(true)
  const [displayTextIndex, setDisplayTextIndex] = useState(0)
  const texts = [
    "Processing your request",
    "Gathering card information ",
    "Preparing your card details",
    "Waiting for Payment Confirmation",
  ]

  console.log(location?.state)

  useEffect(() => {
    setUSDValue(usdValue)
  }, [])

  useEffect(() => {
    const currentDate = new Date()

    // Convert UTC time to PST (UTC - 8 hours)
    const currentPSTHour = currentDate.getUTCHours() - 8

    const getNextBusinessDayPST = (date) => {
      const pstOffsetHours = -8
      const pstOffsetMilliseconds = pstOffsetHours * 60 * 60 * 1000

      const utcDate = date.getTime()
      const utcDayOfWeek = new Date(utcDate).getUTCDay()

      let daysToAdd = 1

      if (utcDayOfWeek === 5) {
        daysToAdd = 3
      } else if (utcDayOfWeek === 6) {
        daysToAdd = 2
      }

      const pstNextBusinessDay = new Date(
        utcDate + pstOffsetMilliseconds + daysToAdd * 24 * 60 * 60 * 1000
      )

      return pstNextBusinessDay
    }

    const nextBusinessDayPST = getNextBusinessDayPST(currentDate)

    const nextBusinessDay = nextBusinessDayPST.toLocaleString("en-US", {
      weekday: "long",
    })

    const isWorkingDayPST = (date) => {
      const pstOffsetHours = -8
      const pstOffsetMilliseconds = pstOffsetHours * 60 * 60 * 1000

      const pstDate = new Date(date.getTime() + pstOffsetMilliseconds)
      const pstDayOfWeek = pstDate.getUTCDay()

      return pstDayOfWeek >= 1 && pstDayOfWeek <= 5
    }

    const isWorkingDay = isWorkingDayPST(currentDate)

    if (
      data?.payment_method === "wire" &&
      data?.objectDataReturn?.order_total > 500 &&
      !cookies?.pfAuthToken &&
      currentPSTHour < 10 &&
      currentPSTHour >= 17
    ) {
      setWireOrderSuccessMessage(
        `Our team will contact you before 10:00am PST on ${nextBusinessDay}.`
      )
    } else if (
      data?.payment_method === "wire" &&
      data?.objectDataReturn?.order_total > 500 &&
      !cookies?.pfAuthToken &&
      isWorkingDay
    ) {
      setWireOrderSuccessMessage(
        `Our team will contact you within the hour to confirm your order and send payment instructions. Thank you!!`
      )
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setBTCRateLoading(true)
      try {
        const response = await axios.post("/api/rate-api")
        const btcPrice = response.data.value
        setBTCRate(btcPrice)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setBTCRateLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalCartItemsCount = data?.objectDataReturn?.items?.reduce(
    (accumulator, object) => {
      return accumulator + Number(object.quantity)
    },
    0
  )

  useInterval(() => {
    if (data?.payment_method !== "wire") {
      axios?.get(`/api/btc-check-status/${data?.order_number}`)?.then((res) => {
        if (res?.data?.status === "Payment not Confirmed Yet.") {
          nav("/thank-you", {
            state: { orderNumber: data?.order_number, email },
          })
        }
      })
    }
  }, 3000)

  useEffect(() => {
    // Use setInterval to rotate through the texts every 10 seconds
    const intervalId = setInterval(() => {
      setDisplayTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 5000) // 10000 milliseconds (10 seconds)

    // Clean up the interval when the component unmounts or when you no longer need it
    return () => clearInterval(intervalId)
  }, [])
  const currentText = texts[displayTextIndex]

  return (
    <>
      <Navbarlogo
        customGoBack={() =>
          data?.payment_method === "wire" ? nav("/") : nav(-1)
        }
      />
      <div className="checkout-main1">
        <div className="twocards1">
          <div className="payment-card1">
            <Card
              className="custom-card"
              title="Order Details"
              style={{ borderBottom: "none" }}
            >
              <div class="image-container">
                <div class="loader">
                  <p className="payment-confirmation">{currentText}</p>
                </div>
                <img
                  src={visa}
                  width={"100%"}
                  alt="card-info"
                  className="payment-visa-card"
                />
              </div>

              {(user?.email || email) && (
                <div className="order-details">
                  <p className="order-detail-para">Email Address</p>
                  <div className="email-div">
                    <p className="emailad">{user?.email || email}</p>
                  </div>
                </div>
              )}
              <div className="payment-details">
                <p className="order-detail-para">Payment Mode</p>
                <div className="email-div">
                  <p className="emailad">
                    {data?.payment_method === "wire"
                      ? "Wire Transfer"
                      : "Bitcoin"}
                  </p>
                </div>
              </div>
              <div className="invoice-details">
                <p className="order-detail-para">Invoice Id</p>
                <div className="email-div">
                  <p className="emailad">{data?.order_number || uuidv4()}</p>
                </div>
              </div>
              <Divider className="custom-divider" />
              {isBulkOrder ? (
                <>
                  {data?.objectDataReturn?.items?.map((item) => {
                    const { quantity, amount, subtotal, cardType } = item

                    return (
                      <div className="custom-upper-para-pay">
                        <div className="value2">
                          <img
                            className="visacardtype-img1"
                            src={cardType === "visa" ? visa : mastercard}
                            alt="Visa"
                          />
                          <div className="nayasa">
                            <p className="order-detail-para">Prepaid Card</p>
                            <p>
                              {quantity || 0} x ${amount || 0}
                            </p>
                          </div>
                          {data?.payment_method !== "wire" && (
                            <div className="item-actions">
                              <p className="BTC">
                                {usdToBTC(subtotal, btcRate) ?? 0} BTC
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  <div className="custom-bottom-para pay-para">
                    <p className="subtotal">Subtotal</p>
                    <p className="BTC-total">
                      ${data?.objectDataReturn?.order_subtotal}
                    </p>
                  </div>
                  <div>
                    <p>
                      Number of additional transactions per card:{" "}
                      {data?.objectDataReturn?.items[0]
                        ?.additional_transactions_no ?? 0}
                    </p>
                    <p>
                      International allowance fee:{" "}
                      {data?.objectDataReturn?.items[0]?.international_cost ??
                        0}
                    </p>
                    <p>
                      Prepaid card purchase price:{" "}
                      {data?.objectDataReturn?.items[0]?.quantity}x $
                      {data?.objectDataReturn?.items[0]?.cost}
                    </p>
                    {data?.payment_method === "wire" ? (
                      <>
                        <p>
                          Wire Transfer Fee: $
                          {data?.objectDataReturn?.transaction_fee ?? 0}
                        </p>
                        <p>
                          Invoice Identifier Fee: $
                          {data?.objectDataReturn?.invoice_identifier_fee ?? 0}
                        </p>
                      </>
                    ) : (
                      <p>
                        BTC exchange fee: $
                        {data?.objectDataReturn?.transaction_fee ?? 0}
                      </p>
                    )}
                  </div>

                  <p className="subtotal">Total</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="mb-0">
                      ${data?.objectDataReturn?.order_total}
                    </p>
                    {data?.payment_method !== "wire" && (
                      <p className="BTC-total">
                        {data?.btc_amount}
                        BTC
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {data?.objectDataReturn &&
                    data?.objectDataReturn?.items?.map((item) => (
                      <div className="custom-upper-para-pay">
                        <div className="value2">
                          {item?.type === "visa" ? (
                            <>
                              <div>
                                <img
                                  src={visa}
                                  alt="Visa"
                                  className="visacardtype-img1"
                                />

                                <div className="nayasa">
                                  <p className="order-detail-para">
                                    Prepaid Card
                                  </p>
                                  <p>{`${item?.quantity || 1} x $${
                                    item?.price
                                  }`}</p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <img
                                  src={mastercard}
                                  alt="MasterCard"
                                  className="cardtype-img1"
                                />

                                <div className="nayasa">
                                  <p className="order-detail-para">
                                    Prepaid Card
                                  </p>
                                  <p>{`${item?.quantity || 1} x $${
                                    item?.price
                                  }`}</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="final-payment">
                          <p className="BTC-simplecard">
                            {usdToBTC(item?.price, btcRate) ?? 0} BTC
                          </p>
                        </div>
                      </div>
                    ))}
                  <div className="final-pay">
                    <p>
                      Prepaid Card Purchase Price: {totalCartItemsCount} x $
                      {data?.objectDataReturn?.items[0]
                        ? data?.objectDataReturn?.items[0]?.cost
                        : "0"}
                    </p>
                    <p>
                      BTC Exchange Fee: $
                      {data?.objectDataReturn?.transaction_fee}
                    </p>
                  </div>

                  <p className="subtotal">Total</p>
                  <div className="custom-bottom-para pay-para">
                    <p className="subtotal-value">
                      ${data?.objectDataReturn?.order_total}
                    </p>
                    {btcRateLoading ? (
                      <Skeleton.Button size="small" shape="square" active />
                    ) : (
                      <p className="BTC-total">
                        {data?.btc_amount}
                        BTC
                      </p>
                    )}
                  </div>
                </>
              )}
            </Card>
          </div>
          <div className="payment-card2">
            <Card
              className="Contact-title"
              title={
                data?.payment_method === "wire"
                  ? "Pay with Wire Transfer"
                  : "Pay with Bitcoin"
              }
              bordered={false}
              headStyle={{ borderBottom: "none" }}
            >
              {data?.payment_method === "wire" ? (
                <WireTransfer
                  email={email}
                  customThankYouMessage={wireOrderSuccessMessage}
                />
              ) : (
                <>
                  <QRCode value={data?.bitcon_address} size={230} />
                  <div className="pay-h">
                    <p className="pay-h1">Payment details</p>
                    <p className="pay-h2">Payment unique address</p>
                    <p className="pay-h3">{data?.bitcon_address}</p>
                  </div>
                  <div className="pay-h">
                    <p className="pay-h4">Amount to pay</p>
                    <p className="value">{data?.btc_amount} BTC</p>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
