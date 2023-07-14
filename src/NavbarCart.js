import React, { useState, useContext, Fragment } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Badge, Modal, Button, Divider } from "antd"
import { CartContext } from "./CartContext"
import visa from "./assets/Visacart.png"
import mastercard from "./assets/Mastercardcart.png"
import "./navbar.css"
import logo from "./assets/logo.png"
import ham from "./assets/ham.png"

function NavbarCart() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const input1 = queryParams.get("usdValue")
  const input2 = queryParams.get("btcValue")
  const input3 = queryParams.get("selectedButton")
  const [selectedButton, setSelectedButton] = useState(input3)
  const [usdValue, setUSDValue] = useState(input1)
  const [btcValue, setBtcValue] = useState(input2)
  const { cartItems } = useContext(CartContext)
  const { cartCount } = useContext(CartContext)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [resmenu, setResMenu] = useState("none")
  const navigate = useNavigate()

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleCloseClick = () => {
    setIsCartOpen(false)
  }

  const handleKeepShopping = () => {
    setIsCartOpen(false)
    navigate("/")
  }

  const handleCheckout = () => {
    const queryParams = cartItems.map((item) => {
      return `usdValue=${item.usdValue}&btcValue=${item.btcValue}&selectedButton=${item.card}`;
    }).join("&");
    navigate(`/checkout?${queryParams}`);
  }

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="left">
        <div
          className="hamburg"
          onClick={() => {
            if (resmenu === "none") setResMenu("flex")
            else setResMenu("none")
          }}
        >
          <img src={ham} alt="Menu" />
          <div className="navmenu" style={{ display: resmenu }}>
            <Link to="/">HOME</Link>
            <Link to="/bulkorder">BULK ORDERS</Link>
            <Link to="/contactus">CONTACT US</Link>
            <Link to="/login">
              <span className="user">
                <UserOutlined />
                LOGIN
              </span>
            </Link>
          </div>
        </div>
        <div className="first-four-navigation">
          <Link to="/">HOME</Link>
          <Link to="/bulkorder">BULK ORDERS</Link>
          <Link to="/">HOW IT WORKS</Link>
          <Link to="/contactus">CONTACT </Link>
          <Link to="/login">
            <span className="user">
              <UserOutlined />
              LOGIN
            </span>
          </Link>
        </div>

        <div className="navlogin-cart">
          <div onClick={handleCartClick}>
            <Badge count={cartCount} className="carticon">
              <ShoppingCartOutlined />
            </Badge>
          </div>
        </div>
      </div>

      <Modal
        visible={isCartOpen}
        onCancel={handleCloseClick}
        footer={null}
        className="cart-modal"
        style={{
          borderRadius: "8px",
          top: "60px",
          left: "31%",
          width: "80%",
        }}
      >
        {/* <Fragment>
          {cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <Fragment key={item.id}>
                {item.card === "1" ? (
                  <>
                    <div style={{ display: "flex" }}>
                      <img src={visa} alt="Visa" className="visacardtype-img" />
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

                <p style={{marginLeft:"60px",marginTop:"-15px"}}>${item.usdValue}</p>
                <Divider />
              </Fragment>
            ))
          )}
        </Fragment> */}
<Fragment>
  {cartItems.length === 0 ? (
    <p>Cart is empty</p>
  ) : (
    <>
      {cartItems.reduce((uniqueItems, item) => {
        const existingItem = uniqueItems.find(
          (uniqueItem) => uniqueItem.usdValue === item.usdValue && uniqueItem.card === item.card
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          uniqueItems.push({ ...item, quantity: 1 });
        }

        return uniqueItems;
      }, []).map((item) => {
        const { usdValue, card, quantity } = item;
        const multipliedValue = usdValue * quantity;

        return (
          <Fragment key={item.id}>
            {card === "1" ? (
              <>
                <div style={{ display: "flex" }}>
                  <img src={visa} alt="Visa" className="visacardtype-img" />
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

            <p style={{ marginLeft: "60px", marginTop: "-15px" }}>
              ${usdValue} x {quantity} = ${multipliedValue}
            </p>
            <Divider />
          </Fragment>
        );
      })}
    </>
  )}
</Fragment>




        <div className="cart-modal-footer">
          <Button key="keepShopping" onClick={handleKeepShopping}>
            Keep Shopping
          </Button>
          <Button key="checkout" type="primary" onClick={handleCheckout}>
            Checkout ({cartItems.length})
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default NavbarCart
