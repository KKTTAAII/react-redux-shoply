import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import "../css/List.css";

const List = () => {
  const inventory = useSelector(state => state.inventory);

  const allItems =
    inventory.length !== 0 ? (
      inventory.map(item => {
        const { name, price, description, image_url, id } = item;
        return (
          <Item
            key={id}
            src={image_url}
            name={name}
            price={price}
            description={description}
            id={id}
          />
        );
      })
    ) : (
      <div>Loading....</div>
    );

  return <div className="List-container">{allItems}</div>;
};

export default List;
