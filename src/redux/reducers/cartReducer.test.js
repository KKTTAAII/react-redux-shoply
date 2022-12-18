import cartReducer from "./cartReducer";
import { ADD, REMOVE } from "./actions/actionTypes/actionTypes";

describe("cart reducer", () => {
  it("should add an item to the cart", () => {
    const startAction = { type: ADD, item: "tv" };
    expect(cartReducer({}, startAction)).toEqual({ tv: 1 });
  });

  it("should not add anything if no item is specified", () => {
    const startAction = { type: ADD };
    expect(cartReducer({}, startAction)).toEqual({});
  });

  it("should remove an item from the cart", () => {
    const endAction = { type: REMOVE, item: "tv" };
    expect(cartReducer({tv: 1}, endAction)).toEqual({});
  });

  it("should not do anything to the cart", () => {
    const endAction = { type: REMOVE, item: "tv" };
    expect(cartReducer({}, endAction)).toEqual({});
  });
});
