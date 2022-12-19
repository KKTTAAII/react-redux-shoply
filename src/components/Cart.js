import React from "react";
import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import "../css/Cart.css";

const Cart = () => {
  const [grandTotal, setGrandTotal] = useState(0);
  const cart = useSelector(state => state.cart);
  const cartItems = Object.keys(cart);

  useEffect(() => {
    const totals = document.querySelectorAll(".CartItem-Total");
    function getTotals() {
      const allTotal = [];
      for (let total of totals) {
        let text = total.innerText;
        let num = +text.slice(1);
        allTotal.push(num);
      }
      setGrandTotal(allTotal.reduce((acc, next) => acc + next, 0));
    }
    getTotals();
  }, [cart]);

  const allItemsInCart =
    Object.keys(cart).length === 0 && cart.constructor === Object ? (
      <div>Cart is empty</div>
    ) : (
      cartItems.map((item, i) => <CartItem name={item} key={i} />)
    );

  return (
    <div className="Cart-container">
      <Stack className="Cart-items">
        <h1>Shopping Bag</h1>
        {allItemsInCart}
      </Stack>
      <div className="Cart-order-sum">
        <p>Order Summary</p>
        <p>Sub Total: ${grandTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
