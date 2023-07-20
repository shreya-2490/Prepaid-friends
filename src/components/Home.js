import { useState, useEffect } from "react"
import { Select, Card, Image, Alert, Slider } from "antd"
import { Link } from "react-router-dom"
import visa from "../assets/Visa.png"
import mastercard from "../assets/Mastercard.png"
import ReactTypingEffect from "react-typing-effect"
import "../styles/home.css"
import axios from "axios"
import Footer from "./Footer"

const { Option } = Select

const Home = () => {
  const [usdValue, setUSDValue] = useState("")
  const [btcValue, setBTCValue] = useState("0")
  const [selectedCard, setSelectedCard] = useState(null)
  const [isValueValid, setIsValueValid] = useState(false)
  const [selectedButton, setSelectedButton] = useState(1)
  const [button, setButton] = useState(1)
  const [loadAmount, setLoadAmount] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("low");

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

  const handleBuyButtonClick = () => {
    if (btcValue === "0.00000") {
      setIsValueValid(true)
    } else {
      setIsValueValid(false)
    }
  }

  const handleSliderChange = (value) => {
    console.log("Selected Range:", value)
    // You can work with the selected range value here.
  }
  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value)
  }

  // Handler for the price filter
  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        )
        const btcPrice = response.data.bitcoin.usd
        setBTCValue((usdValue / btcPrice).toFixed(5))
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    }

    fetchData()

    setIsValueValid(false)
  }, [usdValue, loadAmount])

  const handleUSDSelect = (selectedValue) => {
    const value = parseFloat(selectedValue) // Convert selectedValue to a number
    setUSDValue(value)
    setIsValueValid(false)
    setLoadAmount(selectedValue)
  }

  return (
    <>
      <div className="main-body">
        <div className="home" id="homee">
          <div>
            {" "}
            <h1 className="home-heading">
              Effortless Payments with{" "}
              <span style={{ color: "#FDC886", fontWeight: "600" }}>BTC</span>
            </h1>
          </div>
          <div>
            <h1 className="home-heading-1">
              Experience the Convenience of Prepaid Cards
            </h1>
          </div>
          {/* <div className="pushEffect">
            <span style={{ animationDelay: "1s" }}>Visa</span>
            <span style={{ animationDelay: "5s" }}>Mastercard</span>
          </div>
          <br />
          <span style={{marginLeft:"40%"}}>Prepaid Card</span> */}

          <p className="subtitle">
            Unlock the power of digital currencies with our cryptocurrency
            prepaid cards. Simplify your online purchases and enjoy a seamless
            payment experience. Our user-friendly platform allows you to
            effortlessly calculate the BTC equivalent of your desired prepaid
            card amount. Discover the many advantages of using cryptocurrency
            for your everyday transactions.
          </p>
          {/* <div className="learn-more-btn">
            <Link to="/">
              <button>How it Works</button>
            </Link>
          </div> */}
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
                  New Card
                </button>
              </div>
              <div className="second-btn">
                <button
                  className="sell"
                  style={{
                    backgroundColor: button === 2 ? "#fdc886" : "white",
                    color: "#1b1b1b",
                  }}
                  onClick={(event) => handleMainButtonClick(event, 2)}
                >
                  Pre-owned Card
                </button>
              </div>
            </div>
            <div className="sider-content">
              {button === 1 && (
                <div className="forms">
                  <div style={{ marginBottom: "20px" }}>
                    <form>
                      <div className="card-selector-container">
                        <p className="choose-card">Select Card</p>
                        <div className="selection-cards-visamastercard">
                          <button
                            className={`button ${
                              selectedButton === 1 ? "selected" : ""
                            }`}
                            onClick={(event) => handleButtonClick(event, 1)}
                          >
                            <img src={visa} className="homepage-cards"></img>
                          </button>
                          <button
                            className={`mastercard-button ${
                              selectedButton === 2 ? "selected" : ""
                            }`}
                            onClick={(event) => handleButtonClick(event, 2)}
                          >
                            <div className="mastercard-image">
                              <img
                                src={mastercard}
                                className="homepage-cards"
                              ></img>
                            </div>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div>
                    <form>
                      <div className="both-gray">
                        <div className="first-gray">
                          <div className="first-gray-1">
                            <label className="pay">Select Amount</label>
                          </div>
                          <div>
                            <select
                              value={loadAmount}
                              onChange={(event) =>
                                handleUSDSelect(event.target.value)
                              }
                              className="dropdown-amount"
                            >
                              <option value="" disabled hidden>
                                --
                              </option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                              <option value="200">200</option>
                              <option value="500">500</option>
                            </select>
                          </div>
                        </div>
                        <div className="second-gray">
                          <div className="items">
                            {/* <picture className="usdt-pic">
                          <img src={dollar}></img>
                        </picture> */}
                            <span className="dropdown-1">USD</span>
                          </div>
                        </div>
                      </div>
                    </form>
                    <p
                      style={{
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "400",
                        marginLeft: "2%",
                        display: "inline",
                      }}
                    >
                      {/* <picture className="bit-pic">
                    <img src={bitcoin}></img>
                  </picture> */}
                      <span
                        style={{
                          margin: "0px",
                          fontFamily: "Outfit, sans-serif",
                        }}
                      >
                        ≈ {btcValue} BTC
                      </span>
                    </p>

                    <div>
                      {btcValue === "0.00000" && (
                        <Alert
                          style={{ marginTop: "15px", position: "relative" }}
                          message="Please select a valid amount"
                          type="warning"
                          showIcon
                          closable
                        />
                      )}

                      {btcValue !== "0.00000" ? (
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
                      ) : (
                        <button
                          className="buy-usdt disabled"
                          type="button"
                          disabled
                        >
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {button === 2 && (
                <div className="forms">
                  <div style={{ margin: "15px 0px" }}>
                    <form>
                      <div className="both-gray">
                        <div className="first-gray">
                          <div className="first-gray-1">
                            <label className="pay">Select Provider</label>
                          </div>
                          <div>
                            <select
                              className="dropdown-amount"
                              value={selectedProvider}
                              onChange={handleProviderChange}
                            >
                              <option value="All">All</option>
                              <option value="Visa">Visa</option>
                              <option value="MasterCard">MasterCard</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div>
                    <form>
                      <div className="both-gray">
                        <div className="first-gray">
                          <div className="first-gray-1">
                            <label className="pay">Price</label>
                          </div>
                          <select
                            className="price-amount"
                            value={selectedPrice}
                            onChange={handlePriceChange}
                          >
                            <option value="low">Low to High </option>
                            <option value="high">High to Low</option>
                          </select>
                        </div>
                      </div>
                    </form>

                    <div>
                      <Link to="/preowned">
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
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Home
