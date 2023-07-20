import React, { useEffect, useState, useContext } from "react";
import { Card } from "antd";
import { useLocation } from "react-router-dom";
import { CartContext } from "./CartContext";
import { AiOutlineSafety } from "react-icons/ai";
import NavbarCart from "./NavbarCart";
import mastercard from "../assets/Mastercardcartpage.png";
import visacard from "../assets/Visacartpage.png";
import "../styles/CartPage.css";
import { v4 as uuidv4 } from "uuid";

const Cart = ({ handleAddToCart }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const input1 = queryParams.get("usdValue");
  const input2 = queryParams.get("btcValue");
  const input3 = queryParams.get("selectedButton");
  const [selectedButton, setSelectedButton] = useState(input3);
  const [title, setTitle] = useState("MASTER PREPAID CARD");
  const [usdValue, setUSDValue] = useState(input1);
  const [btcValue, setBtcValue] = useState(input2);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const { addToCart } = useContext(CartContext);
  const exchangeRate = 0.000038; // Example exchange rate, replace with the actual rate

  const handleUSDChange = (event) => {
    const usdInput = parseFloat(event.target.value);
    setUSDValue(usdInput);
    setBtcValue(usdInput * exchangeRate);
  };
  const handleAddToCartClick = () => {
    addToCart({
      usdValue: usdValue,
      btcValue: btcValue,
      card: selectedButton,
      // Using UUID to generate random ID until we finalize any unique identifier for each card transactions.
      id: uuidv4(),
    });
    setIsSuccessModalVisible(true);
  };

  useEffect(() => {
    setUSDValue(usdValue);
    setBtcValue(btcValue);
    setSelectedButton(selectedButton);
  }, []);

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
              headStyle={{ borderBottom: "none" }}
            >
              {selectedButton == 1 ? (
                <img src={visacard}></img>
              ) : (
                <img src={mastercard}></img>
              )}
            </Card>
          </div>
          <div className="card2-cart">
            <Card
              className="Contact-title"
              title={selectedButton == 1 ? "VISA PREPAID CARD" : title}
              bordered={false}
              headStyle={{ borderBottom: "none" }}
            >
              {selectedButton == 1 ? (
                <p className="custom-para2-cart">
                  Embrace the future of financial transactions with our Visa
                  Prepaid Card, where the convenience of prepaid cards meets the
                  power of Bitcoin. Simplify your payments, expand your
                  purchasing possibilities, and enjoy the advantages of digital
                  currency in a secure and sophisticated manner.
                  <br />
                  <br />
                  <span style={{ color: "red" }}>
                    NOTE: We will charge a flat rate card fee of $2.98 per card.
                  </span>
                </p>
              ) : (
                <p className="custom-para2-cart">
                  Embrace the future of financial transactions with our Master
                  Prepaid Card, where the convenience of prepaid cards meets the
                  power of Bitcoin. Simplify your payments, expand your
                  purchasing possibilities, and enjoy the advantages of digital
                  currency in a secure and sophisticated manner.
                  <br />
                  <br />
                  <span style={{ color: "red" }}>
                    NOTE: We will charge a flat rate card fee of $2.98 per card.
                  </span>
                </p>
              )}
              <div>
                <div>
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
                <div>
                  <p className="btcvalue">Expected BTC</p>
                  <div className="cart-input">
                    <p className="expected-value">{btcValue}</p>
                  </div>
                </div>
              </div>{" "}
              <div className="cart-btn">
                <button onClick={handleAddToCartClick}>Add to Cart</button>
              </div>
              <div className="icons">
                <AiOutlineSafety
                  style={{
                    fontSize: "25px",
                    color: "#41D195",
                    marginRight: "10px",
                  }}
                />
                <p style={{ marginRight: "10px" }}>Simple Checkout Process</p>
                <AiOutlineSafety
                  style={{
                    fontSize: "25px",
                    color: "#41D195",
                    marginRight: "10px",
                  }}
                />{" "}
                <p style={{ marginRight: "10px" }}>Instant, Private, Safe</p>
                <AiOutlineSafety
                  style={{
                    fontSize: "25px",
                    color: "#41D195",
                    marginRight: "10px",
                  }}
                />
                <p style={{ marginRight: "10px" }}>Email Delivery</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
