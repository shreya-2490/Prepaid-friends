import { useState, useEffect } from "react";
import {
  Alert,
  Input,
  Space,
  Tag,
  Modal,
  Button,
  message,
  Divider,
} from "antd";
import { useNavigate } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
import "../styles/home.css";
import axios from "axios";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { usdToBTC } from "../utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [usdValue, setUSDValue] = useState("");
  const [btcValue, setBTCValue] = useState("");
  const [button, setButton] = useState(1);
  const [alert, showAlert] = useState(false);
  const navigate = useNavigate();
  const [isCalculatingBtcEquivalent, setIsCalculatingBtcEquivalent] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [isCalculatingCharges, setIsCalculatingCharges] = useState(false);
  const [additionalCharges, setAdditionalCharges] = useState(null);
  const [btcRate, setBtcRate] = useState(0);
  const [isSendingToPayment, setIsSendingToPayment] = useState(false);
  const [cardsSold, setCardsSold] = useState(0);
  const [happyCustomers, setHappyCustomers] = useState(0);
  const [cardValue, setCardValue] = useState(0);

  const handleMainButtonClick = (event, buttonId) => {
    event.preventDefault();
    setButton(buttonId);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCardsSold(Math.floor(Math.random() * 10000));
      setHappyCustomers(Math.floor(Math.random() * 5000));
      setCardValue((Math.random() * 1000000).toFixed(1));
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleBuyButtonClickMain = () => {
    if (btcValue === "0.00000") {
      return;
    } else {
      setIsSendingToPayment(true);
      usdValue
        ? axios
            ?.post(`/api/preowned-order`, {
              email: emailValue,
              payment_method: "btc",
              guest: true,
              items: [
                {
                  quantity: 1,
                  price: usdValue,
                },
              ],
            })
            .then((res) =>
              navigate(`/payment`, {
                state: { email: emailValue, data: res?.data },
              })
            )
            .catch((err) =>
              message.error(
                err?.response?.data?.error || err?.response?.data?.message
              )
            )
            ?.finally(() => setIsSendingToPayment(true))
        : showAlert(true);
    }
  };
  const handleButtonClick = () => {
    navigate("/how-it-works");
  };

  const handleProceed = () => {
    axios
      ?.post(`/api/preowned-order`, {
        payment_method: "btc",
        guest: true,
        items: [
          {
            quantity: 1,
            price: usdValue,
          },
        ],
      })
      .then((res) =>
        navigate(`/payment`, {
          state: { data: res?.data },
        })
      )
      .catch((err) =>
        message.error(
          err?.response?.data?.error || err?.response?.data?.message
        )
      )
      ?.finally(() => setIsSendingToPayment(true));
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const getItemCalculation = (price) => {
    setIsCalculatingCharges(true);
    axios
      ?.post("/api/order-calculation-api", {
        order_type: "preOwned",
        payment_method: "btc",
        items: [
          {
            quantity: 1,
            price,
          },
        ],
      })
      ?.then((res) => setAdditionalCharges(res?.data))
      ?.catch((err) => console.error(err))
      ?.finally(setIsCalculatingCharges(false));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsCalculatingBtcEquivalent(true);
      try {
        const response = await axios.post("/api/rate-api");
        const btcPrice = response.data.value;
        setBtcRate(btcPrice);
        setBTCValue(usdToBTC(usdValue, btcPrice));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsCalculatingBtcEquivalent(false);
      }
    };

    if (usdValue) {
      fetchData();
      getItemCalculation(usdValue);
    } else {
      setBTCValue("");
    }
  }, [usdValue]);

  const handleUSDSelect = (selectedValue) => {
    const value = parseFloat(selectedValue);
    setUSDValue(value || "");
    selectedValue ? showAlert(false) : showAlert(true);
  };

  const handleTagClick = (value) => {
    handleUSDSelect(value);
  };

  const pageTitle = "Prepaid Friends | Your Bitcoin Bridge to Global Spending";
  const pageDescription =
    "Prepaid Friends: Your Bitcoin bridge to global spending. Exchange BTC for prepaid cards and enjoy seamless transactions worldwide. Join now!";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <div className="main-body">
        <div className="home" id="homee">
          <div>
            <h5 className="home-upper-heading">Turn Crypto into Real Money</h5>
            <h1 className="home-heading">Two Steps to Convenience</h1>
            <h1 className="home-heading-1">
              Purchase Your Prepaid Card with Crypto Instantly.
            </h1>
          </div>

          <p className="subtitle">
            With zero hidden fees and enhanced security features, you control
            your spending
            <br /> without compromise. Experience a seamless blend of crypto
            functionality and <br />
            everyday usability today!
          </p>
          <Button className="how-it-works-btn" onClick={handleButtonClick}>
            HOW IT WORKS
          </Button>

          <div class="counter-info">
            <span class="first-item">
              <p class="counters"> 10K +</p>
              <p>Cards Sold</p>
            </span>
            <span class="first-item">
              <p class="counters">5K+</p>
              <p>Happy Customers</p>
            </span>
            <span class="first-item">
              <p class="counters"> 1.0M+</p>
              <p>In Card Value</p>
            </span>
          </div>
        </div>

        <div className="sider">
          <div className="box">
            <div className="buttons">
              <div className="first-btn">
                <button
                  className="buy"
                  style={{
                    backgroundColor: button === 1 ? "#fdc886" : "white",
                    color: "#1b1b1b",
                  }}
                  onClick={(event) => handleMainButtonClick(event, 1)}
                >
                  Buy Prepaid Cards
                </button>
              </div>
            </div>
            <div className="sider-content">
              <div className="forms">
                <div style={{ marginBottom: "20px" }}></div>
                <div>
                  <h6>Enter Prepaid Card Amount</h6>
                  <form>
                    <div className="input-with-symbol">
                      <Input
                        value={usdValue}
                        onChange={(event) =>
                          handleUSDSelect(event.target.value)
                        }
                        placeholder="0.00"
                        className="placeholder-input1"
                      />
                      <span className="usd-symbol">
                        <span>USD</span>
                      </span>
                    </div>
                  </form>
                  <Space size={[0, 8]} wrap className="tags">
                    <span className="popular-amounts">Popular Amounts</span>
                    <Tag onClick={() => handleTagClick("25")}>$25</Tag>
                    <Tag onClick={() => handleTagClick("50")}>$50</Tag>
                    <Tag onClick={() => handleTagClick("75")}>$75</Tag>
                    <Tag onClick={() => handleTagClick("100")}>$100</Tag>
                    <Tag onClick={() => handleTagClick("200")}>$200</Tag>
                  </Space>

                  <form style={{ marginTop: "1rem" }}>
                    <div className="input-with-symbol">
                      <span className="currency-symbol">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{ color: "#000000" }}
                        />
                      </span>
                      <Input
                        type="email"
                        className="placeholder-input"
                        placeholder=" Enter your email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                        rules={[
                          {
                            required: true,
                            message: "Email is required!",
                          },
                        ]}
                      />
                    </div>
                  </form>
                  <div>
                    {alert && (
                      <Alert
                        style={{ marginTop: "15px", position: "relative" }}
                        message="Please enter a valid amount"
                        type="warning"
                        showIcon
                        closable
                      />
                    )}

                    <button
                      className="buy-usdt"
                      type="button"
                      onClick={handleBuyButtonClickMain}
                    >
                      ORDER NOW
                    </button>
                  </div>
                  {usdValue && (
                    <div className="xtra-charges">
                      <>
                        {" "}
                        <div className="xtra-charges-para">
                          <div class="tooltip-container">
                            <p>
                              BTC Exchange Fee:
                              <span class="tooltip-icon">
                                <InfoCircleOutlined />
                                <span class="tooltip-text">
                                  This is a network exchange fee. It is
                                  calculated as 1% of the total.
                                </span>
                              </span>
                            </p>
                          </div>{" "}
                          <p> {additionalCharges?.transaction_fee || 0} USD</p>
                        </div>
                        <Divider className="xtra-charges-divider" />
                        <div className="xtra-charges-para">
                          <p style={{ fontWeight: "600" }}>
                            Prepaid Card Purchase Price:
                          </p>
                          <p>
                            {" "}
                            {(additionalCharges?.items &&
                              additionalCharges?.items[0]?.cost) ||
                              0}{" "}
                            USD
                          </p>
                        </div>
                        <Divider className="xtra-charges-divider" />
                        <div className="xtra-charges-para">
                          <p style={{ fontWeight: "600" }}>
                            Total(Amount in USD)
                          </p>
                          <p>{additionalCharges?.order_total} USD</p>
                        </div>
                        <Divider className="xtra-charges-divider" />
                        <div className="xtra-charges-para">
                          <p style={{ fontWeight: "600" }}>
                            Total(Amount in BTC)
                          </p>
                          <p>
                            {usdToBTC(
                              additionalCharges?.order_total,
                              btcRate
                            ) || 0}{" "}
                            BTC
                          </p>
                        </div>
                      </>
                    </div>
                  )}
                  <Modal
                    title="⚠️ Warning"
                    open={isModalVisible}
                    onCancel={handleModalCancel}
                    footer={null}
                    className="email-alert-box"
                  >
                    <div className="alert-email">
                      <p>
                        It appears that you have not entered your email address.
                        Without an email address, you will not receive an order
                        confirmation in your inbox.
                        <br />
                      </p>
                      <h5>Why is this important? </h5>
                      <p>
                        Your order confirmation email will contain essential
                        details about your purchase, including your card
                        details.
                      </p>
                      <h5>What to do if you proceed without an email? </h5>
                      <p>
                        If you choose to proceed without entering an email, you
                        can still contact our support team with your wallet
                        address to receive your card details and order
                        confirmation.
                      </p>
                    </div>
                    <div className="cart-modal-footer alert-btn">
                      <Button
                        className="ant-btn-default"
                        onClick={handleProceed}
                        style={{ backgroundColor: "#fdc886" }}
                      >
                        Proceed to Pay
                      </Button>
                      <Button
                        className="ant-btn-default"
                        onClick={handleModalCancel}
                      >
                        Enter Email
                      </Button>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Home;
