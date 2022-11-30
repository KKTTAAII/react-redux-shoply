const INITIAL_STATE = {};
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD":
      const addedItem = action.item;
      if (state[addedItem]) {
        state[addedItem]++;
      } else {
        state[addedItem] = 1;
      }
      return { ...state };
    case "REMOVE":
      const removedItem = action.item;
      if (state[removedItem] === 1) {
        delete state[removedItem];
      } else {
        state[removedItem]--;
      }
      return { ...state };
    default:
      return state;
  }
};

export default cartReducer;
