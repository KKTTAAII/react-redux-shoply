import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { add, remove } from "../redux/reducers/actions/actions";

const Product = () => {
  const cart = useSelector(state => state.cart, shallowEqual);
  const dispatch = useDispatch();
  const addItem = name => dispatch(add(name));
  const removeItem = name => dispatch(remove(name));
  const inventory = useSelector(state => state.inventory, shallowEqual);
  const { productId } = useParams();

  const product =
    inventory.length !== 0
      ? inventory.filter(prod => prod.id === productId)[0]
      : { name: "", price: "", description: "", image_url: "", id: "" };
  const { name, price, description, image_url } = product;

  return (
    <div>
      <h1>{name}</h1>
      <img src={image_url} alt={name} />
      <p>${price}</p>
      <p>{description}</p>
      <div>
        <span role="img" aria-label="Plus" onClick={() => addItem(name)}>
          ➕
        </span>
        <p>{cart[name] > 0 ? cart[name] : 0}</p>
        <span role="img" aria-label="Minus" onClick={() => removeItem(name)}>
          ➖
        </span>
      </div>
    </div>
  );
};

export default Product;
