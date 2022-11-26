import React from "react";
import "../css/Item.css";

const Item = ({ src, name, price, description }) => {
  return (
    <div className="Item-container">
      <img src={src} alt={name} className="Item-img" />
      <p className="Item-name">{name}</p>
      <p className="Item-price">${price}</p>
      <p className="Item-description">{description}</p>
      <div>
        <button className="Item-add-btn">➕</button>
        <button className="Item-remove-btn">➖</button>
      </div>
    </div>
  );
};

export default Item;
