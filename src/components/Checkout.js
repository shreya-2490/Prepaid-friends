import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Select, Checkbox, Alert, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Navbarlogo from "./Navbarlogo";
import "../styles/checkout.css";
import validator from "validator";
import visa from "../assets/Visacartpage.png";
import mastercard from "../assets/Mastercardcartpage.png";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import axios from "axios";
import { usdToBTC } from "../utils/helper";

const Checkout = () => {
  const [api, contextHolder] = notification.useNotification();

  const [btcRate, setBTCRate] = useState(null);
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [email, setEmail] = useState("");

  const handleDelete = (cartItem) => {
    removeFromCart(cartItem?.id);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleChange = (item, quantity) => {
    updateQuantity(item?.id, quantity);
  };

  useEffect(() => {
    axios
      ?.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((response) => setBTCRate(response?.data?.bitcoin?.usd))
      .catch((error) => console.error(error));
  }, []);

  const totalNewCardValue = cartItems?.reduce((accumulator, object) => {
    return (
      accumulator + Number(object.usdValue) * Number(object?.quantity || 1)
    );
  }, 0);

  const totalCardsValue = totalNewCardValue;

  const handleSubmit = () => {
    if (email && validator.isEmail(email)) {
      setEmail(email);
      axios
        ?.post(`/preowned-order`, {
          first_name: "Test first name",
          last_name: "Test last name",
          email: email,
          payment_method: "btc",
          guest: true,
          items: cartItems?.map((cartItem) => ({
            type:
              cartItem?.type === "1" || cartItem?.type === "visa"
                ? "visa"
                : "master",
            quantity: cartItem?.quantity,
            price: cartItem?.usdValue,
            bin: cartItem?.bin,
            card: cartItem?.card,
            cardId: cartItem?.cardId,
          })),
        })
        .then((res) =>
          navigate(`/front-demo/payment`, {
            state: { email, data: res?.data },
          })
        );
    } else {
      api.error({
        message: "Invalid email format",
        description: "Please enter a correct email address.",
      });
    }
  };

  return (
    <>
      <Navbarlogo />
      {contextHolder}
      <div className="checkout-main">
        <div className="twocards" style={{ overflowX: "hidden" }}>
          <div className="card1">
            <Card
              className="custom-card1"
              title="Order Summary"
              bordered={false}
              headStyle={{ borderBottom: "none" }}
            >
              <div className="custom-upper-para">
                {cartItems?.map((cartItem) => {
                  const { id, usdValue, quantity, type } = cartItem;

                  const totalValue = usdValue * quantity;
                  return (
                    <div key={id} className="item-container">
                      <div className="valuess">
                        <div className="valuessinner">
                          <img
                            className="visa-mastercard-checkout"
                            src={
                              type === "1" || type === "visa"
                                ? visa
                                : mastercard
                            }
                            alt="Visa"
                          />
                          <div className="item-details">
                            <div className="valueheading">
                              {type === "1" || type === "visa"
                                ? "Visa"
                                : "MasterCard"}
                            </div>
                            <div className="value">
                              {quantity} x ${usdValue} = ${totalValue}
                            </div>
                          </div>
                        </div>

                        <div className="item-actions">
                          <div>
                            <Select
                              className="select"
                              defaultValue={quantity}
                              onChange={(value) =>
                                handleChange(cartItem, value)
                              }
                              options={[
                                { value: 1, label: "1" },
                                { value: 2, label: "2" },
                                { value: 3, label: "3" },
                                { value: 4, label: "4" },
                              ]}
                            />
                            <DeleteOutlined
                              className="divider"
                              onClick={() => handleDelete(cartItem)}
                            />
                          </div>
                          <p className="BTC">
                            {usdToBTC(totalValue, btcRate)} BTC
                          </p>
                        </div>
                      </div>

                      {quantity === 4 && (
                        <Alert
                          message="You have hit the maximum quantity limit, if you want to buy more items please make a bulk order."
                          type="warning"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="custom-bottom-para-total">
                <p className="custom-para">Total Estimate</p>

                <div className="custom-upper-cardvalue">
                  <p className="value123">${totalCardsValue}</p>
                  <p className="BTC-total">
                    {usdToBTC(totalCardsValue, btcRate)} BTC
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="card2">
            <Card
              className="Contact-title1"
              title="Contact Information"
              bordered={false}
              headStyle={{ borderBottom: "none" }}
            >
                 <div>
                <p className="email">Name</p>
                <input
                  type="name"
                  className="email-box"
                ></input>
              </div>
              <div>
                <p className="email">Email address for order status updates</p>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="email-box"
                ></input>
              </div>
              <div className="checkbox">
                <Checkbox
                  style={{ marginRight: "10px" }}
                  checked={isChecked1}
                  onChange={handleCheckboxChange1}
                />
                <p>
                  Add me to the newsletter to receive news about new products
                  and features
                </p>
              </div>
              <div className="checkbox">
                <Checkbox
                  style={{ marginRight: "10px" }}
                  checked={isChecked2}
                  onChange={handleCheckboxChange2}
                />
                <p>
                  I have read and agree with the Prepaid Friends
                  <span className="terms">
                    <Link to="/front-demo/terms&conditions">
                      Terms & Conditions
                    </Link>{" "}
                    and
                    <Link to="/front-demo/privacypolicy"> Privacy Policy</Link>
                  </span>
                </p>
              </div>
              <div className="payment">
                <Button
                  style={{
                    backgroundColor: isChecked2 ? "#FDC886" : "#FDC886",
                    color: isChecked2 ? "#1b1b1b" : "#1b1b1b",
                    marginBottom: "10px",
                  }}
                  className="payment-btn"
                  disabled={!isChecked2}
                  onClick={handleSubmit}
                >
                  Continue to payment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
