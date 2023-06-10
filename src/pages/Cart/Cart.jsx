import React from "react";
import "./Cart.css";
import { useSelector } from "react-redux";
import Cart_card from "../../components/Cart_card/Cart_card";

const Cart = () => {
  const items = useSelector((data) => data.cart.cart);
  return items[0] ? (
    <div className="cart">
      {items?.map((e) => (
        <Cart_card data={e} key={e.id} />
      ))}
      <div className="total">
        <h4>
          Total: {items.reduce((a, e) => (a + parseInt(e.price)) * e.count, 0)}$
        </h4>
        <button>Buy</button>
      </div>
    </div>
  ) : (
    <div>
      <h2 style={{ textAlign: "center" }}>Nothing found</h2>
    </div>
  );
};

export default Cart;
