const INITIAL_STATE = {};
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD":
      const addedItem = action.item;
      if (!addedItem) {
        return { ...state };
      } else if (state[addedItem]) {
        state[addedItem]++;
        return { ...state };
      } else {
        state[addedItem] = 1;
        return { ...state };
      }
    case "REMOVE":
      const removedItem = action.item;
      if (!removedItem) {
        return { ...state };
      } else if (!state[removedItem]) {
        return { ...state };
      } else if (state[removedItem] <= 1) {
        delete state[removedItem];
        return { ...state };
      } else {
        state[removedItem]--;
        return { ...state };
      }
    default:
      return { ...state };
  }
};

export default cartReducer;
