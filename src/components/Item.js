import React from "react";
import "../css/Item.css";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/reducers/actions/actions";

const Item = ({ src, name, price, description }) => {
  const cart  = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const addItem = name => dispatch(add(name));
  const removeItem = name => dispatch(remove(name));
  return (
    <div className="Item-container">
      <img src={src} alt={name} className="Item-img" />
      <p className="Item-name">{name}</p>
      <p className="Item-price">${price}</p>
      <p className="Item-description">{description}</p>
      <div className="Item-update-quantity-container">
        <span onClick={() => addItem(name)} className="Item-add-btn">
          ➕
        </span>
        <p className="Item-quantity">{cart[name] > 0 ? cart[name] : 0}</p>
        <span onClick={() => removeItem(name)} className="Item-remove-btn">
          ➖
        </span>
      </div>
    </div>
  );
};

export default Item;
