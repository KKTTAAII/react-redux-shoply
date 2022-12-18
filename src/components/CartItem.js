import React from "react";
import "../css/CartItem.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { add, remove } from "../redux/reducers/actions/actions";

const CartItem = ({ name }) => {
  const cart = useSelector(state => state.cart);
  const inventory = useSelector(state => state.inventory, shallowEqual);
  const dispatch = useDispatch();
  const addItem = name => dispatch(add(name));
  const removeItem = name => dispatch(remove(name));
  const item = inventory.filter(item => item.name === name);
  const { image_url, price } = item[0];

  return (
    <div>
      <img src={image_url} alt={name} className="CartItem-img" />
      <p>{price}</p>
      <span role="img" aria-label="Plus" onClick={() => addItem(name)}>
        ➕
      </span>
      <p className="Item-quantity">{cart[name] > 0 ? cart[name] : 0}</p>
      <span role="img" aria-label="Minus" onClick={() => removeItem(name)}>
        ➖
      </span>
      <p>Total: {cart[name] * price}</p>
    </div>
  );
};

export default CartItem;
