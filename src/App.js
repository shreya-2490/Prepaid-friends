import React, { useEffect, useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Home1 from "./components/Home1"
import NavbarCart from "./components/NavbarCart"
import Checkout from "./components/Checkout"
import Login from "./components/Login"
import Cart from "./components/CartPage"
import BulkOrder from "./components/BulkOrder"
import ContactUs from "./components/ContactUs"
import Payment from "./components/payment"
import { CartProvider } from "./components/CartContext"
import Dashboard from "./components/Dashboard"
import Terms from "./components/Terms&Conditions"
import Policy from "./components/Privacypolicy"
import BulkCheckout from "./components/BulkCheckout"
import { Thankyou } from "./components/Thankyou"
import HowItWorks from "./components/HowItWorks"
import Register from "./components/Register"
import ScrollToTop from "./components/scroll"
import ForgetPassword from "./components/ForgetPassword"
import ResetPassword from "./components/ResetPassword"
import ProtectedRoute from "./shared-components/protected-route"
import Reset from "./components/reset"
import { AuthContext } from "./context/auth-context"
import { useCookies } from "react-cookie"
import Invoice from "./components/Invoice"
import Email from "./components/Emailtemplateimages"
import ShowItem from "./components/showItem"
import NotFound from "./components/NotFound"
import { PaymentFailed } from "./components/PaymentFailed"

function App() {
  const [cartItems, setCartItems] = useState([])
  const [selectedProvider, setSelectedProvider] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState("low")
  const [user, setUser] = useState(null)
  const [cookies] = useCookies(["pfAuthToken"])

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item])
  }

  useEffect(() => {
    if (cookies?.pfAuthToken) {
      setUser(JSON?.parse(localStorage?.getItem("user")))
    }
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <CartProvider>
          <Router>
            <ScrollToTop>
              <Routes>
                <Route
                  path="/"
                  element={<NavbarCart handleAddToCart={handleAddToCart} />}
                />
              </Routes>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home1
                      selectedProvider={selectedProvider}
                      selectedPrice={selectedPrice}
                    />
                  }
                />
              </Routes>

              {/* <Routes>
                <Route
                  path="/cart"
                  element={<Cart handleAddToCart={handleAddToCart} />}
                />
              </Routes> */}
              <Routes>
                <Route path="/bulk-checkout" element={<BulkCheckout />} />
              </Routes>
              <Routes>
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
              <Routes>
                <Route path="/forgot-password" element={<ForgetPassword />} />
              </Routes>
              <Routes>
                <Route path="/register" element={<Register />} />
              </Routes>
              <Routes>
                <Route
                  path="/invoice"
                  element={
                    <ProtectedRoute>
                      <Invoice />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Routes>
                <Route
                  path="/reset-password/:stoken"
                  element={<ResetPassword />}
                />
              </Routes>
              <Routes>
                <Route path="/bulk-order" element={<BulkOrder />} />
              </Routes>
              <Routes>
                <Route path="/contact-us" element={<ContactUs />} />
              </Routes>
              <Routes>
                <Route
                  path="/show-item/:orderId"
                  element={
                    <ProtectedRoute>
                      <ShowItem />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Routes>
                <Route path="/terms-conditions" element={<Terms />} />
              </Routes>
              <Routes>
                <Route path="/privacy-policy" element={<Policy />} />
              </Routes>
              <Routes>
                <Route
                  path="/images"
                  element={
                    <ProtectedRoute>
                      <Email />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Routes>
                <Route
                  path="/thank-you"
                  element={
                    <ProtectedRoute>
                      <Thankyou />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Routes>
                <Route
                  path="/payment-failed"
                  element={
                    <ProtectedRoute>
                      <PaymentFailed />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Routes>
                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <Reset />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Routes>
                <Route path="/how-it-works" element={<HowItWorks />} />
              </Routes>
              {/* <Routes>
                <Route path="*" element={<NotFound />} />
              </Routes> */}
            </ScrollToTop>
          </Router>
        </CartProvider>
      </AuthContext.Provider>
    </div>
  )
}

export default App
