import React from "react";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const cartItemNames = Object.keys(cart);

  const allItemsInCart =
    Object.keys(cart).length === 0 && cart.constructor === Object ? (
      <div>Cart is empty</div>
    ) : (
      cartItemNames.map((item, i) => <CartItem name={item} key={i} />)
    );

  return (
    <Stack>
      <h1>Shopping Bag</h1>
      {allItemsInCart}
    </Stack>
  );
};

export default Cart;
