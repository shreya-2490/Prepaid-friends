import React, { useState, useContext } from "react";
import { CartDispatchContext, addToCart } from "contexts/cart";

const ProductCard = ({ data }) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const { image, cardtype, usd, btc } = data;

  const handleAddToCart = () => {
    const product = { ...data, quantity: 1 };
    addToCart(dispatch, product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3500);
  };

  return (
    <div className="product">
      <div className="product-image">
        <img src={image} alt={cardtype} />
      </div>
      <h4 className="product-name">{cardtype}</h4>
          <p className="product-price">{usd}</p>
          <p>{btc}</p>
      <div className="product-action">
        <button
          className={!isAdded ? "" : "added"}
          type="button"
          onClick={handleAddToCart}
        >
          {!isAdded ? "ADD TO CART" : "✔ ADDED"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
