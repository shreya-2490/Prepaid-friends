import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Tooltip, Select, Checkbox } from "antd";
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import Navbarlogo from "./Navbarlogo";
import "../styles/checkout.css";
import Payment from "./payment";
import validator from "validator";
import visa from "../assets/Visacart.png";
import mastercard from "../assets/Mastercardcart.png";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { removeFromCart } = useContext(CartContext);
  const queryParams = new URLSearchParams(location.search);
  const input3 = queryParams.get("selectedButton");
  const input1 = queryParams.get("usdValue");
  const input2 = queryParams.get("btcValue");
  const valuesCount = queryParams.getAll("usdValue").length;

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [paymentStatus, setPaymentstatus] = useState(false);
  const [values, setValues] = useState([]);
  const [selectedButton, setSelectedButton] = useState(input3 || "1");
  const [usdValue, setUSDValue] = useState(input1 || "");
  const [btcValue, setBtcValue] = useState(parseFloat(input2) || 0);
  const [email, setEmail] = useState("");
  const [cardType, setCardType] = useState("");
  const [displaySelectedButton, setDisplaySelectedButton] = useState(false);

  useEffect(() => {
    const newValues = [];
    for (let i = 0; i < valuesCount; i++) {
      const usdValue = queryParams.getAll("usdValue")[i];
      const btcValue = parseFloat(queryParams.getAll("btcValue")[i]);
      const selectedButton = queryParams.getAll("selectedButton")[i];
      const id = queryParams.getAll("id")[i];
      newValues.push({ usdValue, btcValue, selectedButton, id });
    }
    setValues(newValues);
    setUSDValue(input1);
    setBtcValue(parseFloat(input2));
    setSelectedButton(input3);
    setCardType(queryParams.get("cardType") || "");
    setDisplaySelectedButton(queryParams.has("selectedButton"));
  }, [location]);

  const handleDelete = (item) => {
    const updatedValues = values.filter((value) => value.id !== item?.id);
    setValues(updatedValues);
    removeFromCart(item?.id);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    setPaymentstatus(true);
    if (validator.isEmail(email)) {
      setEmail(email);
    } else {
      alert("Invalid email format. Please enter a correct email address.");
    }

    const queryParams = new URLSearchParams({
      cardType: cardType,
      email: email,
      usdValue: usdValue,
      btcValue: btcValue,
      selectedButton: selectedButton,
      totalAmount: totalAmount,
      totalBTC: totalBTC,
    });

    navigate(`/payment?${queryParams}`);
  };

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const tooltipText = "This is the text that will be displayed on hover.";

  const handleChange = (items, quantity) => {
    const newState = values?.map((value) => {
      const matchedItem = items?.find((item) => item?.id === value?.id);
      if (matchedItem) {
        return { ...matchedItem, quantity };
      }
      return value;
    });

    setValues(newState);
  };

  const displayCardQuantity = queryParams.get("cardQuantity");
  const displayLoadAmount = queryParams.get("loadAmount");

  const exchangeRate = 0.000038; // Example exchange rate, replace with the actual rate
  const getMultipliedValue = (usdValue, selectedButton) => {
    const filteredValues = values.filter(
      (value) =>
        value.usdValue === usdValue && value.selectedButton === selectedButton
    );
    const duplicateItemCount = filteredValues.length;

    if (duplicateItemCount === 1) {
      return {
        multipliedValue: usdValue,
        btcValue: filteredValues[0].btcValue,
      };
    } else {
      const multipliedValue = usdValue * duplicateItemCount;
      const btcValue = filteredValues[0].btcValue * duplicateItemCount;

      return {
        multipliedValue,
        btcValue,
      };
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    let totalBTC = 0;

    const totalUsdSum = values.reduce((accumulator, object) => {
      return accumulator + object.usdValue * (object?.quantity || 1);
    }, 0);

    const uniqueValues = Array.from(
      new Set(values.map((value) => value.usdValue))
    );
    uniqueValues.forEach((usdValue) => {
      const filteredValues = values.filter(
        (value) => value.usdValue === usdValue
      );
      const cardTypes = new Set(
        filteredValues.map((value) => value.selectedButton)
      );

      cardTypes.forEach((cardType) => {
        const filteredValuesForCard = filteredValues.filter(
          (value) => value.selectedButton === cardType
        );
        const duplicateItemCount = filteredValuesForCard.length;

        if (duplicateItemCount === 1) {
          const { multipliedValue, btcValue } = getMultipliedValue(
            usdValue,
            cardType
          );
          totalAmount += parseFloat(multipliedValue);
          totalBTC += btcValue;
        } else {
          const multipliedValue = usdValue * duplicateItemCount;
          const btcValue =
            filteredValuesForCard[0].btcValue * duplicateItemCount;
          totalAmount += parseFloat(multipliedValue);
          totalBTC += btcValue;
        }
      });
    });

    return { totalAmount: totalUsdSum, totalBTC: totalBTC.toFixed(5) };
  };

  const { totalAmount, totalBTC } = getTotalAmount();

  const bulktotal = displayLoadAmount * displayCardQuantity * exchangeRate;
  const totalbulkamt = displayLoadAmount * displayCardQuantity;

  return (
    <>
      <Navbarlogo />
      <div className="checkout-main">
        {!paymentStatus ? (
          <div className="twocards1" style={{ overflowX: "hidden" }}>
            <div className="card1">
              <Card
                className="custom-card"
                title="Order Summary"
                bordered={false}
                style={{ width: 450, margin: "90px 0px 0px 30px" }}
                headStyle={{ borderBottom: "none" }}
              >
                <div className="custom-upper-para">
                  {Array.from(
                    new Set(values.map((value) => value.usdValue))
                  ).map((usdValue) => {
                    const filteredValues = values.filter(
                      (value) => value.usdValue === usdValue
                    );
                    const uniqueSelectedButtons = Array.from(
                      new Set(
                        filteredValues.map((value) => value.selectedButton)
                      )
                    );

                    return (
                      <div key={usdValue} className="custom-upper-para-item">
                        {uniqueSelectedButtons.map((selectedButton) => {
                          const filteredItems = filteredValues.filter(
                            (value) => value.selectedButton === selectedButton
                          );
                          const duplicateItemCount = filteredItems.length;
                          const { multipliedValue, btcValue } =
                            getMultipliedValue(usdValue, selectedButton);

                          return (
                            <div
                              key={selectedButton}
                              className="item-container"
                            >
                              <div className="value">
                                {selectedButton === "1" ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img src={visa} alt="Visa" />
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img src={mastercard} alt="MasterCard" />
                                  </div>
                                )}
                              </div>
                              <div className="item-details">
                                <p className="value">
                                  {usdValue}{" "}
                                  {duplicateItemCount > 1
                                    ? `x ${duplicateItemCount}`
                                    : ""}{" "}
                                  = ${multipliedValue}
                                </p>
                                {!queryParams.has("loadAmount") && (
                                  <div className="item-actions">
                                    <Select
                                      className="select"
                                      defaultValue="1"
                                      style={{ width: 54 }}
                                      onChange={(value) =>
                                        handleChange(filteredItems, value)
                                      }
                                      options={[
                                        { value: 1, label: "1" },
                                        { value: 2, label: "2" },
                                        { value: 3, label: "3" },
                                        { value: 4, label: "4" },
                                        { value: 5, label: "5" },
                                        { value: 6, label: "6" },
                                        { value: 7, label: "7" },
                                        { value: 8, label: "8" },
                                      ]}
                                    />
                                    <DeleteOutlined
                                      className="divider"
                                      onClick={() => {
                                        handleDelete(filteredItems[0]);
                                      }}
                                    />
                                    {queryParams.has("loadAmount") ? (
                                      ""
                                    ) : (
                                      <p className="BTC">
                                        {btcValue.toFixed(5)} BTC
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                <div className="custom-bottom-para-total">
                  <div className="custom-bottom-para">
                    <div className="custom-tooltip">
                      <p className="custom-para">Total Estimate</p>
                      <Tooltip title={tooltipText}>
                        <InfoCircleOutlined />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="custom-upper-cardvalue">
                    {queryParams.has("loadAmount") ? (
                      <p className="value">${totalbulkamt}</p>
                    ) : (
                      <p className="value">${totalAmount}</p>
                    )}
                    {queryParams.has("loadAmount") ? (
                      <p className="BTC-total">{bulktotal.toFixed(5)} BTC</p>
                    ) : (
                      <p className="BTC-total">{totalBTC} BTC</p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
            <div className="card2">
              <Card
                className="Contact-title"
                title="Contact Information"
                bordered={false}
                headStyle={{ borderBottom: "none" }}
                style={{
                  width: "638px",
                  height: 380,
                  margin: "90px 0px 0px 30px",
                }}
              >
                <div>
                  <p className="email">
                    Email address for order status updates
                  </p>
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
                    <a href="" className="terms">
                      Terms & Conditions and the Privacy Policy
                    </a>
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
        ) : (
          <Payment email={email} />
        )}
      </div>
    </>
  );
};

export default Checkout;
