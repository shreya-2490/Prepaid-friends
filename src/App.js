import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
// import About from "./components/AboutUsdt"
// import BulkCard from "./components/BulkCard"
// import Offers from "./components/Offers"
// import Choose from "./components/WhyChooseUs"
// import Faq from "./components/Faq"
// import Explore from "./components/exploreprepaid"
// import Ticker from "./components/ticker"
// import Footer from "./components/Footer"
import NavbarCart from "./components/NavbarCart"
import Checkout from "./components/Checkout"
import Login from "./components/Login"
import Cart from "./components/CartPage"
import BulkOrder from "./components/BulkOrder"
import ContactUs from "./components/ContactUs"
import Payment from "./components/payment"
import { CartProvider } from "./components/CartContext"
import Dashboard from "./components/Dashboard"
import Preowned from "./components/Preowned"
import Terms from "./components/Terms&condition"
import Policy from "./components/Privacypolicy"

function App() {
  const [cartItems, setCartItems] = useState([])
  const [selectedProvider, setSelectedProvider] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState("low")

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item])
  }
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Routes>
            <Route
              path="/front-demo"
              element={<NavbarCart handleAddToCart={handleAddToCart} />}
            />
          </Routes>
          <Routes>
            <Route
              path="/front-demo"
              element={
                <Home
                  selectedProvider={selectedProvider}
                  selectedPrice={selectedPrice}
                />
              }
            />
          </Routes>
          {/* <Routes>
          <Route path="/" element={<About />} />
        </Routes>
        <Routes>
          <Route path="/" element={<BulkCard />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Offers />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Choose />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Faq />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Explore />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Footer />} />
        </Routes> */}
          {/* <Routes>
          <Route path="/" element={<Ticker/>} />
        </Routes> */}

          <Routes>
            <Route
              path="front-demo/cart"
              element={<Cart handleAddToCart={handleAddToCart} />}
            />
          </Routes>
          <Routes>
            <Route path="front-demo/checkout" element={<Checkout />} />
          </Routes>
          <Routes>
            <Route path="front-demo/payment" element={<Payment />} />
          </Routes>
          <Routes>
            <Route path="front-demo/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="front-demo/bulkorder" element={<BulkOrder />} />
          </Routes>
          <Routes>
            <Route path="front-demo/contactus" element={<ContactUs />} />
          </Routes>
          <Routes>
            <Route path="front-demo/terms&conditions" element={<Terms />} />
          </Routes>
          <Routes>
            <Route path="front-demo/privacypolicy" element={<Policy />} />
          </Routes>
          <Routes>
            <Route path="front-demo/dashboard" element={<Dashboard />} />
          </Routes>
          <Routes>
            <Route
              path="front-demo/preowned"
              element={
                <Preowned
                  selectedProvider={selectedProvider}
                  selectedPrice={selectedPrice}
                />
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  )
}

export default App
