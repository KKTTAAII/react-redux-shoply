import React from "react";
import "../css/CartItem.css";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/reducers/actions/actions";
import { Link } from "react-router-dom";

const CartItem = ({ name }) => {
  const cart = useSelector(state => state.cart);
  const inventory = useSelector(state => state.inventory);
  const dispatch = useDispatch();
  const addItem = name => dispatch(add(name));
  const removeItem = name => dispatch(remove(name));
  const item = inventory.filter(item => item.name === name);
  const { image_url, price, id } = item[0];
  const total = cart[name] * price;

  return (
    <div className="CartItem-container">
      <div className="CartIem-img-container">
        <Link to={`/products/${id}`} key={id} className="List-link">
          <img src={image_url} alt={name} className="CartItem-img" />
        </Link>
        <p>{name}</p>
        <p>Price: ${price}</p>
      </div>

      <div className="CartIem-detail-container">
        <div className="CartItem-quantity">
          <span
            role="img"
            aria-label="Plus"
            onClick={() => addItem(name)}
            className="CartItem-add"
          >
            ➕
          </span>
          <p className="Item-quantity">{cart[name] > 0 ? cart[name] : 0}</p>
          <span
            role="img"
            aria-label="Minus"
            onClick={() => removeItem(name)}
            className="CartItem-remove"
          >
            ➖
          </span>
        </div>
        <p className="CartItem-Total">${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
