import { DeleteOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import visa from "../../assets/Visacartpage.png";
import mastercard from "../../assets/Mastercardcartpage.png";
import { useContext } from "react";
import { CartContext } from "../../components/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleDeleteFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div className={cartItems.length > 5 ? "scrollable-cart" : ""} id={cartItems.length > 5 ? "style-1":""}>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems?.map((cartItem) => {
            const { id, usdValue, type, quantity } = cartItem;
            const multipliedValue = usdValue * quantity;

            return (
              <div key={id}>
                {type === "1" || type === "visa" ? (
                  <div className="visadiv">
                    <img src={visa} alt="Visa" className="visacardtype-img" />
                    <p>Visa</p>
                  </div>
                ) : (
                  <div className="visadiv">
                    <img
                      src={mastercard}
                      alt="MasterCard"
                      className="cardtype-img"
                    />
                    <p>MasterCard</p>
                  </div>
                )}
                <div className="delete">
                  <p>
                    {quantity} x ${usdValue} = ${multipliedValue}
                  </p>
                  <p>
                    <DeleteOutlined onClick={() => handleDeleteFromCart(id)} />
                  </p>
                </div>
                <Divider />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Cart;
