const INITIAL_STATE = { cart: {} };
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD":
      const addedItem = action.item;
      if (state.cart[addedItem]) {
        state.cart[addedItem]++;
      } else {
        state.cart[addedItem] = 1;
      }
      console.log({ ...state });
      return { ...state };
    case "REMOVE":
      const removedItem = action.item;
      if (state.cart[removedItem] === 1) {
        delete state.cart[removedItem];
      } else {
        state.cart[removedItem]--;
      }
      console.log({ ...state });
      return { ...state };
    default:
      return state;
  }
};

export default cartReducer;
