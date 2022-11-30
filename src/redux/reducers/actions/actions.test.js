import rootReducer from "../rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import moxios from "moxios";
import { getInventory, add, remove } from "./actions";

const testStore = initialState => {
  const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleWare(rootReducer, initialState);
};

describe("get inventory data", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("Store is updated correctly", () => {
    const expectedState = [
      {
        description:
          "A beautiful, big-screen TV. Because hey, Netflix isn't going to watch itself.",
        id: "0",
        image_url:
          "https://images.samsung.com/is/image/samsung/latin_en-hd-j4300ah-un32j4300ahxpa-001-front-indigo-blue",
        name: "tv",
        price: 219.99,
      },
    ];

    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(getInventory()).then(() => {
      const newState = store.getState();
      expect(newState["inventory"].length).toEqual(1);
      expect(newState["inventory"]).toEqual(expectedState);
    });
  });

  test("store was not updated", () => {
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: null,
      });
    });

    return store.dispatch(getInventory()).then(() => {
      const newState = store.getState();
      expect(newState["inventory"]).toEqual([null]);
    });
  });
});

describe("add/remove item from cart", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("adds an item to cart store", () => {
    const expectedState = [
      {
        description:
          "A beautiful, big-screen TV. Because hey, Netflix isn't going to watch itself.",
        id: "0",
        image_url:
          "https://images.samsung.com/is/image/samsung/latin_en-hd-j4300ah-un32j4300ahxpa-001-front-indigo-blue",
        name: "tv",
        price: 219.99,
      },
    ];

    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(getInventory()).then(() => {
      const action = store.dispatch(add("tv"));
      const state = store.getState();
      expect(action.type).toEqual("ADD");
      expect(action.item).toEqual("tv");
      expect(state).toEqual({
        inventory: [
          {
            description:
              "A beautiful, big-screen TV. Because hey, Netflix isn't going to watch itself.",
            id: "0",
            image_url:
              "https://images.samsung.com/is/image/samsung/latin_en-hd-j4300ah-un32j4300ahxpa-001-front-indigo-blue",
            name: "tv",
            price: 219.99,
          },
        ],
        cart: { tv: 1 },
      });
    });
  });

  test("removes an item to cart store", () => {
    const expectedState = [
      {
        description:
          "A beautiful, big-screen TV. Because hey, Netflix isn't going to watch itself.",
        id: "0",
        image_url:
          "https://images.samsung.com/is/image/samsung/latin_en-hd-j4300ah-un32j4300ahxpa-001-front-indigo-blue",
        name: "tv",
        price: 219.99,
      },
    ];

    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(getInventory()).then(() => {
      const action1 = store.dispatch(add("tv"));
      let state = store.getState();
      expect(action1.type).toEqual("ADD");
      expect(action1.item).toEqual("tv");
      expect(state).toEqual({
        inventory: [
          {
            description:
              "A beautiful, big-screen TV. Because hey, Netflix isn't going to watch itself.",
            id: "0",
            image_url:
              "https://images.samsung.com/is/image/samsung/latin_en-hd-j4300ah-un32j4300ahxpa-001-front-indigo-blue",
            name: "tv",
            price: 219.99,
          },
        ],
        cart: { tv: 2 },
      });

      const action2 = store.dispatch(remove("tv"));
      state = store.getState();
      expect(action2.type).toEqual("REMOVE");
      expect(state).toEqual({
        inventory: [
          {
            description:
              "A beautiful, big-screen TV. Because hey, Netflix isn't going to watch itself.",
            id: "0",
            image_url:
              "https://images.samsung.com/is/image/samsung/latin_en-hd-j4300ah-un32j4300ahxpa-001-front-indigo-blue",
            name: "tv",
            price: 219.99,
          },
        ],
        cart: { tv: 1 },
      });
    });
  });
});
