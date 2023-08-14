import React from "react";
import { useState, useEffect } from "react";
import "../styles/payment.css";
import { Card, Divider, QRCode } from "antd";
import visa from "../assets/Visacartpage.png";
import mastercard from "../assets/Mastercardcartpage.png";
import { useLocation, useNavigate } from "react-router-dom";
import Navbarlogo from "./Navbarlogo";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { usdToBTC } from "../utils/helper";
import { WireTransfer } from "./WireTransfer-thanyoupage";
import useInterval from "../hooks/useInterval";

const Payment = () => {
  const nav = useNavigate();
  const [btcRate, setBTCRate] = useState(null);
  const location = useLocation();
  const { email, orderType, data } = location?.state || {};
  const queryParams = new URLSearchParams(location.search);
  const input1 = queryParams.get("usdValue");
  const [usdValue, setUSDValue] = useState(input1);
  const isBulkOrder = orderType === "bulk-order";

  useEffect(() => {
    setUSDValue(usdValue);
  }, []);

  useEffect(() => {
    axios
      ?.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((response) => setBTCRate(response?.data?.bitcoin?.usd))
      .catch((error) => console.error(error));
  }, []);

  const totalCartItemsCount = data?.objectDataReturn?.items?.reduce(
    (accumulator, object) => {
      return accumulator + Number(object.quantity);
    },
    0
  );

  useInterval(() => {
    if (data?.payment_method !== "wire") {
      axios?.get(`/btc-check-status/${data?.order_number}`)?.then((res) => {
        if (res?.data?.status === "Payment Confirmed") {
          nav("/front-demo/thank-you", {
            state: { orderNumber: data?.order_number, email },
          });
        }
      });
    }
  }, 3000);

  return (
    <>
      <Navbarlogo />
      <div className="checkout-main1">
        <div className="twocards1">
          <div className="payment-card1">
            <Card
              className="custom-card"
              title="Order Details"
              style={{ borderBottom: "none" }}
            >
              <div className="order-details">
                <p className="order-detail-para">Email Address</p>
                <div className="email-div">
                  <p className="emailad">{email}</p>
                </div>
              </div>
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
                    const { quantity, amount, subtotal, cardType } = item;

                    return (
                      <div className="custom-upper-para-pay">
                        <div className="value2">
                          <img
                            className="visacardtype-img1"
                            src={cardType === "visa" ? visa : mastercard}
                            alt="Visa"
                          />
                          <div className="nayasa">
                            <p className="order-detail-para">
                              {cardType === "visa" ? "Visa" : "MasterCard"}
                            </p>
                            <p>
                              {quantity || 0} x ${amount || 0}
                            </p>
                          </div>
                          {data?.payment_method !== "wire" && (
                            <div className="item-actions">
                              <p className="BTC">
                                {usdToBTC(subtotal, btcRate)} BTC
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
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
                                  <p className="order-detail-para">Visa</p>
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
                                    MasterCard
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
                            {usdToBTC(item?.price, btcRate)} BTC
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
                    <p>${data?.objectDataReturn?.order_total}</p>
                    <p className="BTC-total">
                      {" "}
                      {usdToBTC(
                        data?.objectDataReturn?.order_total,
                        btcRate
                      )}{" "}
                      BTC
                    </p>
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
                <WireTransfer email={email} />
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
  );
};

export default Payment;
