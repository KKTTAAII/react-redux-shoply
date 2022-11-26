import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getInventory } from "../redux/reducers/actions/actions";
import Item from "./Item";
import "../css/List.css";

const List = () => {
  const inventory = useSelector(state => state.inventory, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

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
          />
        );
      })
    ) : (
      <div>Loading....</div>
    );

  return <div className="List-container">{allItems}</div>;
};

export default List;
