const inventoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_INVENTORY":
      return action.inventory;
    default:
      return state;
  }
};

export default inventoryReducer;
