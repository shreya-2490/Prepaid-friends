import React, { useEffect, useState, useContext, Fragment } from "react"
import { Alert, Card,message } from "antd"
import { useLocation } from "react-router-dom"
import { CartContext } from "./CartContext"
import { AiOutlineSafety } from "react-icons/ai"
import NavbarCart from "./NavbarCart"
import wifi from "../assets/wifi1.png"
import map from "../assets/map1.png"
import master from "../assets/mastercard preowned.png"
import "../styles/CartPage.css"
import { v4 as uuidv4 } from "uuid"
import { Modal, Button } from "antd"
import { useNavigate } from "react-router-dom"
import CartModal from "../shared-components/cart"
import { AuthContext } from "../context/auth-context"
import axios from "axios"
import { useCookies } from "react-cookie"

const Cart = ({ handleAddToCart }) => {
  const location = useLocation()
  const [cookies] = useCookies(["pfAuthToken"])
  const queryParams = new URLSearchParams(location.search)
  const input1 = queryParams.get("usdValue")
  const input2 = queryParams.get("btcValue")
  const input3 = queryParams.get("selectedButton")
  const [selectedButton, setSelectedButton] = useState(input3)
  const [title, setTitle] = useState("MASTER PREPAID CARD")
  const [usdValue, setUSDValue] = useState(input1)
  const [btcValue, setBtcValue] = useState(input2)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const { addToCart, cartCount, cartItems } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [maxLimitErr, setMaxLimitErr] = useState(false)

  const navigate = useNavigate()

  const handleCloseClick = () => {
    setIsCartOpen(false)
  }

  const handleKeepShopping = () => {
    setIsCartOpen(false)
    navigate("/")
  }

  const handleCheckout = () => {
    if (user) {
      setIsLoading(true)
      axios
        ?.post(
          `/api/preowned-order`,
          {
            customer_name: user?.customerName,
            email: user?.email,
            payment_method: "btc",
            guest: false,
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
          },
          {
            headers: { Authorization: `Bearer ${cookies?.pfAuthToken}` },
          }
        )
        .then((res) => {
          navigate(`/payment`, {
            state: { email: user?.email, data: res?.data },
          })
        })
        .catch((error) => {
          message.error(error.response.data.error)
        })
        ?.finally(() => setIsLoading(false))
    } else {
      navigate(`/checkout`)
    }
  }

  const handleUSDChange = (event) => {
    const usdInput = parseFloat(event.target.value)
    setUSDValue(usdInput)
  }
  const handleAddToCartClick = () => {
    const selectedCard = cartItems.findIndex(
      (cartItem) =>
        cartItem.usdValue === usdValue && cartItem.type === selectedButton
    )
    if (cartItems[selectedCard]?.quantity === 4) {
      setMaxLimitErr(true)
      return
    }
    addToCart({
      usdValue: usdValue,
      btcValue: btcValue,
      type: selectedButton,
      // Using UUID to generate random ID until we finalize any unique identifier for each card transactions.
      id: uuidv4(),
    })
    setIsSuccessModalVisible(true)
    setIsCartOpen(true)
    setMaxLimitErr(false)
  }

  useEffect(() => {
    setUSDValue(usdValue)
    setBtcValue(btcValue)
    setSelectedButton(selectedButton)
  }, [])

  return (
    <>
      <NavbarCart />
      <div className="cart-main">
        <div className="twocards-cart" style={{ overflowX: "hidden" }}>
          <div className="card1-cart">
            <div className="card-containercartpage">
              <div className="wrappercardcartpage">
                <div className="container">
                  <div className="card">
                    <img src={map} className="map-img" />
                    <div className="top">
                      <h2 className="h2heading">CARDHOLDER</h2>
                      <h2 className="h2heading">
                        <b className="number">${usdValue}</b>
                      </h2>
                      <img src={wifi} />
                    </div>

                    <div class="infos">
                      <section class="card-number">
                        <h1 className="h1heading">**** **** **** ****</h1>
                      </section>
                      <div class="bottom">
                        <aside class="infos--bottom">
                          <section>
                            <h2 className="h2heading">Expiry date</h2>
                            <h3 className="h3heading">00/00</h3>
                          </section>
                          <section>
                            <h2 className="h2heading">CVV</h2>
                            <h3 className="h3heading">***</h3>
                          </section>
                        </aside>
                        <aside>
                   
                        </aside>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  <p className="amountoncart">Amount</p>

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
                    <div>
                      <p className="btcvalue">Expected BTC</p>
                      <div className="cart-input">
                        <p className="expected-value">{btcValue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="cart-btn mb-4">
                <button onClick={handleAddToCartClick}>Add to Cart</button>
              </div>
              {maxLimitErr && (
                <Alert
                  message="You have hit the maximum quantity limit, if you want to buy more items please make a bulk order."
                  type="warning"
                />
              )}
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

      <Modal
        visible={isCartOpen}
        onCancel={handleCloseClick}
        footer={null}
        className="cart-modal"
        style={{
          width: "10%",
        }}
      >
        <CartModal />

        <div className="cart-modal-footer">
          <Button key="keepShopping" onClick={handleKeepShopping}>
            Keep Shopping
          </Button>
          <Button
            key="checkout"
            type="primary"
            onClick={handleCheckout}
            loading={isLoading}
            disabled={isLoading}
          >
            Checkout ({cartCount})
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default Cart
