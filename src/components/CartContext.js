import React, { createContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext();

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  // Define the cart state  
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Add item to the cart
  const addToCart = (item) => {
    setCartCount(cartCount + 1);
    setCartItems((prevItems) => [...prevItems, item]);
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === itemId);
  
      if (itemToRemove) {
        // Decrease the badge count by 1
        setCartCount((prevCount) => prevCount - 1);
  
        return prevItems.filter((item) => item.id !== itemId);
      }
  
      return prevItems;
    });
  };
  
  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Provide the cart state and actions to the children components
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
