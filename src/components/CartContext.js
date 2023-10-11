import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [bulkCartItems, setBulkCartItems] = useState([]);

  const newCardsCount = cartItems?.reduce((accumulator, object) => {
    return accumulator + object?.quantity || 1;
  }, 0);

  const cartCount = newCardsCount;

  const cartItemLocal = JSON.parse(localStorage?.getItem("cart")) || [];

  useEffect(() => {
    if (cartItemLocal) setCartItems(cartItemLocal);
  }, []);

  const addToCart = (item) => {
    const existingCartItemIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.usdValue === item.usdValue &&
        cartItem.type === item.type &&
        item?.card === cartItem?.card
    );
    if (existingCartItemIndex !== -1) {
      const updatedItems = [...cartItems];
      if (updatedItems[existingCartItemIndex].quantity < 4) {
        updatedItems[existingCartItemIndex].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        setCartItems(updatedItems);
      }
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...cartItemLocal, { ...item, quantity: 1 }])
      );
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };
  const addToBulkCart = (item) => {
    setBulkCartItems([{ ...item }]);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems?.filter(
      (cartItem) => cartItem?.id !== itemId
    );
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };
  const removeBulkFromCart = (itemId) => {
    const updatedCartItems = bulkCartItems?.filter(
      (bulkCartItem) => bulkCartItem?.id !== itemId
    );
    setBulkCartItems(updatedCartItems);
  };

  const updateQuantity = (itemId, quantity) => {
    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === itemId
    );

    if (cartItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[cartItemIndex].quantity = quantity;
      setCartItems(updatedItems);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setBulkCartItems([]);
    localStorage.clear("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        bulkCartItems,
        addToCart,
        addToBulkCart,
        removeBulkFromCart,
        removeFromCart,
        clearCart,
        cartCount,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
