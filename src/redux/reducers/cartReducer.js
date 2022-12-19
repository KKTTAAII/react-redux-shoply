const storedCart = JSON.parse(localStorage.getItem("cart"));
const INITIAL_STATE = Object.keys(storedCart).length !== 0 ? storedCart : {};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD":
      const addedItem = action.item;
      if (!addedItem) {
        return { ...state };
      } else if (state[addedItem]) {
        state[addedItem]++;
        localStorage.setItem("cart", JSON.stringify({ ...state }));
        return { ...state };
      } else {
        state[addedItem] = 1;
        localStorage.setItem("cart", JSON.stringify({ ...state }));
        return { ...state };
      }
    case "REMOVE":
      const removedItem = action.item;
      if (!removedItem) {
        return { ...state };
      } else if (!state[removedItem]) {
        localStorage.setItem("cart", JSON.stringify({ ...state }));
        return { ...state };
      } else if (state[removedItem] <= 1) {
        delete state[removedItem];
        localStorage.setItem("cart", JSON.stringify({ ...state }));
        return { ...state };
      } else {
        state[removedItem]--;
        localStorage.setItem("cart", JSON.stringify({ ...state }));
        return { ...state };
      }
    default:
      return { ...state };
  }
};

export default cartReducer;
