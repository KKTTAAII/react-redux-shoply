import rootReducer from "../rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import moxios from "moxios";
import { getInventory, add, remove } from "./actions";

let store;

beforeEach(() => {
  const testStore = initialState => {
    const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
    return createStoreWithMiddleWare(rootReducer, initialState);
  };
  store = testStore({ inventory: [], cart: {} });
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe("get inventory data", () => {
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

describe("add item to cart", () => {
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
});

describe("removes item", () => {
  test("removes an item from cart store", () => {
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
        cart: { tv: 1 },
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
        cart: {},
      });
    });
  });
});
