import { GET_INVENTORY } from "./actionTypes/actionTypes";
import axios from "axios";

export const getInventory = () => {
  return async dispatch => {
    let res = await axios.get("http://localhost:3001/products");
    dispatch({ type: GET_INVENTORY, inventory: res.data });
  };
};
