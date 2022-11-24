import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventory } from "./redux/reducers/actions/actions";

const List = () => {
  const inventory = useSelector(state => state.inventory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  console.log(inventory);
  return <div></div>;
};

export default List;
