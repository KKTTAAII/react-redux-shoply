import {
  ADD,
  GET_INVENTORY,
  REMOVE,
  SHOW_ERR,
} from "./actionTypes/actionTypes";
import axios from "axios";

export const getInventory = () => {
  return async dispatch => {
    try {
      let res = await axios.get("http://localhost:3000/products");
      dispatch({ type: GET_INVENTORY, inventory: res.data });
    } catch (e) {
      dispatch({ type: SHOW_ERR, err: e.response.data });
    }
  };
};

export const add = item => {
  return { type: ADD, item: item };
};

export const remove = item => {
  return { type: REMOVE, item: item };
};
