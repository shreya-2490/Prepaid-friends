import { useState } from "react"
import { Select, Card, Image, Alert } from "antd"
import { Link } from "react-router-dom"
import dollar from "./assets/dollar.png"
import bitcoin from "./assets/bitcoin.png"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import visa from "./assets/visa.svg"
import mastercard from "./assets/mastercard.png"
import ReactTypingEffect from "react-typing-effect"
import "./home.css" 

const { Option } = Select

const Home = () => {
  const [usdValue, setUSDValue] = useState("")
  const [btcValue, setBTCValue] = useState("0.00")
  const [selectedCard, setSelectedCard] = useState(null)
  const [isValueValid, setIsValueValid] = useState(false)
  const [selectedButton, setSelectedButton] = useState(1)
  const[button, setButton] = useState(2)

  const handleButtonClick = (event, buttonId) => {
    event.preventDefault()
    setSelectedButton(buttonId)
  }
  const handleMainButtonClick = (event, buttonId) => {
    event.preventDefault()
    setButton(buttonId)
  }
  const handleCardSelect = (value) => {
    setSelectedCard(value)
  }

  const handleBuyButtonClick = (e) => {
    if (usdValue === "") {
      e.preventDefault()
      setIsValueValid(true)
    } else {
      setIsValueValid(false)
    }
  }

  const exchangeRate = 0.000038 // Example exchange rate, replace with the actual rate
  const handleUSDChange = (event) => {
    const usdInput = parseFloat(event.target.value)
    setUSDValue(usdInput)
    setBTCValue(usdInput * exchangeRate)
    setIsValueValid(false)
  }

  return (
    <div className="main-body">
      <div className="home" id="homee">
        {/* <h1 className="home-heading">{title}</h1> */}
        <h1 className="home-heading">
          Exchange Bitcoin For
          <div className="pushEffect">
            <span style={{ animationDelay: "1s" }}>Visa</span>
            <span style={{ animationDelay: "5s" }}>Mastercard</span>
          </div>
          <br />
          <span style={{marginLeft:"40%"}}>Prepaid Card</span>
        </h1>
        <p className="subtitle">
          Enjoy the flexibility and accessibility of your digital assets by
          exchanging them for prepaid cards that can be used for online
          purchases, in-store transactions, or cash withdrawals at ATMs
          worldwide.
        </p>
        <div className="learn-more-btn">
          <Link to="/">
            <button>Learn More</button>
          </Link>
        </div>
      </div>
      <div className="sider">
        <div className="box">
          <div className="buttons">
            <div className="first-btn">
              <button className="buy" style={{
                backgroundColor: button === 1 ? "#000000" : "white", color: button===1?"white":"#000000",
              }}  onClick={(event) => handleMainButtonClick(event, 1)}>
                PreOwned Card
              </button>
            </div>
            <div className="second-btn">
              <button className="sell" style={{
                backgroundColor: button === 2 ? "#000000" : "white", color: button===2?"white":"#000000",
              }}
              onClick={(event) => handleMainButtonClick(event, 2)}>
                New Card
              </button>
            </div>
          </div>
          <div className="sider-content">
            <div style={{ display: "block" }}></div>
            <div className="forms">
              <div style={{ marginBottom: "20px" }}>
                <form>
                  <div className="card-selector-container">
                    <p className="choose-card">Choose Card</p>
                    <div className="selection-cards-visamastercard">
                      <button
                        className={`button ${
                          selectedButton === 1 ? "selected" : ""
                        }`}
                        onClick={(event) => handleButtonClick(event, 1)}
                      >
                        <img src={visa}></img>
                      </button>
                      <button
                        className={`mastercard-button ${
                          selectedButton === 2 ? "selected" : ""
                        }`}
                        onClick={(event) => handleButtonClick(event, 2)}
                      >
                        <div className="mastercard-image">
                          <img src={mastercard}></img>
                        </div>
                      </button>
                    </div>
                    {/* <Select
                      value={selectedCard}
                      onChange={handleCardSelect}
                      className="card-selector"
                    >
                      <Option value="visa">
                        <Card
                          actions={[
                            selectedCard === "visa" && (
                              <span onClick={handleCardCancel}>Cancel</span>
                            ),
                          ]}
                        >
                          <Image src={visa} alt="Visa Card" />
                        </Card>
                      </Option>
                      <Option value="mastercard">
                        <Card
                          actions={[
                            selectedCard === "mastercard" && (
                              <span onClick={handleCardCancel}>Cancel</span>
                            ),
                          ]}
                        >
                          <Image src={mastercard} alt="Mastercard" />
                        </Card>
                      </Option>
                    </Select> */}

                    {/* <Select
                      className="card-selector"
                      value={selectedCard}
                      onChange={handleCardSelect}
                      style={{ width: 180 }}
                      dropdownMatchSelectWidth={false}
                      dropdownStyle={{ minWidth: 200 }}
                    >
                      <Option
                        value="visa"
                        label={renderOption("Visa", "./assets/visa.svg")}
                      >
                        Visa
                      </Option>
                      <Option
                        value="mastercard"
                        label={renderOption(
                          "Mastercard",
                          "./assets/mastercard.svg"
                        )}
                      >
                        Mastercard
                      </Option>
                    </Select> */}
                  </div>
                </form>
              </div>
              <div>
                <form>
                  <div className="both-gray">
                    <div className="first-gray">
                      <div className="first-gray-1">
                        <label className="pay">Enter Amount</label>
                        <div className="input-div">
                          <div className="input-box">
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
                              className={
                                btcValue.length > 10 ? "long-value" : ""
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="second-gray">
                      <div className="items">
                        <picture className="usdt-pic">
                          <img src={dollar}></img>
                        </picture>
                        <span className="dropdown-1">USD</span>
                      </div>
                    </div>
                  </div>
                </form>
                <p
                  style={{
                    color: "black",
                    marginLeft: "15px",
                    fontSize: "15px",
                    fontWeight: "400",
                    lineHeight: "16ox",
                    display: "inline",
                  }}
                >
                  <picture className="bit-pic">
                    <img src={bitcoin}></img>
                  </picture>
                  <span style={{ margin: "10px", fontFamily: "Open Sans, sans-serif"}}>{btcValue} BTC</span>
                </p>
                {isValueValid && (
                  <Alert
                    style={{ marginTop: "15px", position: "relative" }}
                    message="Please fill all details"
                    type="warning"
                    showIcon
                    closable
                  />
                )}
                <div>
                  <Link
                    to={`/cart?usdValue=${usdValue}&btcValue=${btcValue}&selectedButton=${selectedButton}`}
                  >
                    <button
                      className="buy-usdt"
                      type="button"
                      onClick={handleBuyButtonClick}
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
