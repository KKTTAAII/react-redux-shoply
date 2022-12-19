import React from "react";
import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import "../css/Cart.css";
import Discount from "./Discount";

const Cart = () => {
  const SALESTAX = 7.25;
  const [grandTotal, setGrandTotal] = useState(0);
  const cart = useSelector(state => state.cart);
  const cartItems = Object.keys(cart);
  const applyDiscount = (subTotal, discount) => {
    setGrandTotal((subTotal - (discount / 100) * subTotal).toFixed(2));
  };
  let tax = ((grandTotal * SALESTAX) / 100).toFixed(2);

  useEffect(() => {
    const totals = document.querySelectorAll(".CartItem-Total");
    function getTotals() {
      const allTotal = [];
      for (let total of totals) {
        let text = total.innerText;
        let num = +text.slice(1);
        allTotal.push(num);
      }
      const sum = allTotal.reduce((acc, next) => acc + next, 0).toFixed(2);
      setGrandTotal(sum);
    }
    getTotals();
  }, [cart]);

  const allItemsInCart =
    Object.keys(cart).length === 0 && cart.constructor === Object ? (
      <div className="Cart-text">Cart is empty</div>
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
        <p className="Cart-order-sum-text">Order Summary</p>
        <p className="Cart-order-sum-text">Sub Total: ${grandTotal}</p>
        <p className="Cart-order-sum-text">Tax: ${tax}</p>
        <p className="Cart-order-sum-text">Total: ${(+grandTotal + +tax).toFixed(2)}</p>
        <Discount discountFormula={applyDiscount} total={grandTotal} />
      </div>
    </div>
  );
};

export default Cart;
