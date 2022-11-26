import { GET_INVENTORY, SHOW_ERR } from "./actions/actionTypes/actionTypes";

const inventoryReducer = (state = [], action) => {
  switch (action.type) {
    case GET_INVENTORY:
      const inventory = [];
      for (let item in action.inventory) {
        action.inventory[item]["id"] = item;
        inventory.push(action.inventory[item]);
      }
      return [...state, ...inventory];
    case SHOW_ERR:
      return [...state, action.err];
    default:
      return state;
  }
};

export default inventoryReducer;
