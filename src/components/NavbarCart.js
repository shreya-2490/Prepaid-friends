import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Modal, Button, Avatar, message } from "antd";
import { CartContext } from "./CartContext";
import "../styles/navbar.css";
import logo from "../assets/logo.png";
import "../styles/NavbarCart.css";
import Cart from "../shared-components/cart";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useCookies } from "react-cookie";
import { AuthContext } from "../context/auth-context";
import axios from "axios";

const NavbarCart = () => {
  const [cookies] = useCookies(["pfAuthToken"]);
  const [showMedia, setMedia] = useState(false);
  const { cartCount, cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseClick = () => {
    setIsCartOpen(false);
  };

  const handleKeepShopping = () => {
    setIsCartOpen(false);
    navigate("/");
  };

  const handleCheckout = () => {
    if (user) {
      setIsLoading(true);
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
          });
        })
        .catch((error) => {
          message.error(error.response.data.error);
        })
        .finally(() => setIsLoading(false));
    } else {
      navigate(`/checkout`);
    }
  };

  const handleHamburgerClick = (event) => {
    event.preventDefault();
    setMedia(!showMedia);
    document.body.classList.toggle("menu-open", !showMedia);
  };

  return (
    <>
      {/* <Ticker/> */}
      <nav
        className="navbarrrr"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* { hamburger menu } */}
        <button className="hamburger" onClick={handleHamburgerClick}>
          {showMedia ? (
            <RxCross2 style={{ color: "black" }} />
          ) : (
            <RxHamburgerMenu style={{ color: "black" }} />
          )}
        </button>

        {/* { logo } */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/* { menu } */}
        <div className={showMedia ? "menu mobile-menu" : "menu"}>
          <ul>
            <div>
              <li>
                <Link to="/">HOME</Link>
              </li>

              <li>
                <Link to="/bulk-order">BUY BULK</Link>
              </li>

              <li className="how">
                <Link to="/how-it-works">HOW IT WORKS</Link>
              </li>

              <li>
                <Link to="/contact-us">CONTACT</Link>
              </li>
            </div>
            <li>
              <Link to={cookies?.pfAuthToken ? "/dashboard" : "/login"}>
                <span className="user">
                  {user ? (
                    <Avatar size="large">{user?.customerName[0]}</Avatar>
                  ) : (
                    <UserOutlined
                      style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                    />
                  )}
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Link to="/login">
            <span className="user2">
              <UserOutlined style={{ fontSize: "1.5rem" }} />
            </span>
          </Link>
        </div>

   
      </nav>

      <Modal
        visible={isCartOpen}
        onCancel={handleCloseClick}
        footer={null}
        className="cart-modal"
        style={{
          width: "10%",
        }}
      >
        <Cart />

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
  );
};

export default NavbarCart;
