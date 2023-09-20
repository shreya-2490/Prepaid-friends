import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home1 from "./components/Home1";
import NavbarCart from "./components/NavbarCart";
import Login from "./components/Login";
import BulkOrder from "./components/BulkOrder";
import ContactUs from "./components/ContactUs";
import Payment from "./components/payment";
import { CartProvider } from "./components/CartContext";
import Dashboard from "./components/Dashboard";
import Terms from "./components/Terms&Conditions";
import Policy from "./components/Privacypolicy";
import BulkCheckout from "./components/BulkCheckout";
import { Thankyou } from "./components/Thankyou";
import HowItWorks from "./components/HowItWorks";
import Register from "./components/Register";
import ScrollToTop from "./components/scroll";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoute from "./shared-components/protected-route";
import Reset from "./components/reset";
import { AuthContext } from "./context/auth-context";
import { useCookies } from "react-cookie";
import Invoice from "./components/Invoice";
import Email from "./components/Emailtemplateimages";
import ShowItem from "./components/showItem";
import NotFound from "./components/NotFound";
import { PaymentFailed } from "./components/PaymentFailed";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("low");
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["pfAuthToken"]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  useEffect(() => {
    if (cookies?.pfAuthToken) {
      setUser(JSON?.parse(localStorage?.getItem("user")));
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <CartProvider>
          <Router>
            <ScrollToTop>
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route
                  path="/"
                  element={
                    <>
                      <NavbarCart handleAddToCart={handleAddToCart} />
                      <Home1
                        selectedProvider={selectedProvider}
                        selectedPrice={selectedPrice}
                      />
                    </>
                  }
                />
                <Route path="/bulk-checkout" element={<BulkCheckout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/invoice"
                  element={
                    <ProtectedRoute>
                      <Invoice />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reset-password/:stoken"
                  element={<ResetPassword />}
                />
                <Route path="/bulk-order" element={<BulkOrder />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route
                  path="/show-item/:orderId"
                  element={
                    <ProtectedRoute>
                      <ShowItem />
                    </ProtectedRoute>
                  }
                />
                <Route path="/terms-conditions" element={<Terms />} />
                <Route path="/privacy-policy" element={<Policy />} />
                <Route
                  path="/images"
                  element={
                    <ProtectedRoute>
                      <Email />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/thank-you"
                  element={
                    <ProtectedRoute>
                      <Thankyou />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment-failed"
                  element={
                    <ProtectedRoute>
                      <PaymentFailed />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <Reset />
                    </ProtectedRoute>
                  }
                />
                <Route path="/how-it-works" element={<HowItWorks />} />
              </Routes>
            </ScrollToTop>
          </Router>
        </CartProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
