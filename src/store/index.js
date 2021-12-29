import Vue from "vue";
import Vuex from "vuex";
import shop from "../api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    // Cart Related
    items: [],
    checkoutStatus: null,
  },
  mutations: {
    // Products Mutations
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    DECREMENT_PRODUCT_INVENTORY(state, { id }) {
      const product = state.products.find((product) => product.id === id);
      product.inventory--;
    },
    // Cart Mutations
    SET_CHECKOUT_STATUS(state, status) {
      state.checkoutStatus = status;
    },
    PUSH_PRODUCT_TO_CART(state, { id }) {
      state.items.push({
        id,
        quantity: 1,
      });
    },
    INCREMENT_QUANTITY(state, { id }) {
      const cartItem = state.items.find((item) => item.id === id);
      cartItem.quantity++;
    },
    SET_CART_ITEMS(state, { items }) {
      state.items = items;
    },
  },
  actions: {
    // Products Actions
    getAllProducts({ commit }) {
      shop.getProducts((products) => {
        commit("SET_PRODUCTS", products);
      });
    },
    // Cart Actions
    addProductToCart({ state, commit }, product) {
      commit("SET_CHECKOUT_STATUS", null);
      if (product.inventory > 0) {
        const cartItem = state.items.find((item) => item.id === product.id);
        if (!cartItem) {
          commit("PUSH_PRODUCT_TO_CART", { id: product.id });
        } else {
          commit("INCREMENT_QUANTITY", cartItem);
        }
        // remove 1 item from stock
        commit(
          "DECREMENT_PRODUCT_INVENTORY",
          { id: product.id }
          // { root: true }
        );
      }
    },
    checkout({ commit, state }, products) {
      const savedCartItems = [...state.items];
      commit("SET_CHECKOUT_STATUS", null);
      // empty cart
      commit("SET_CART_ITEMS", { items: [] });
      shop.buyProducts(
        products,
        () => commit("SET_CHECKOUT_STATUS", "successful"),
        () => {
          commit("SET_CHECKOUT_STATUS", "failed");
          // rollback to the cart saved before sending the request
          commit("SET_CART_ITEMS", { items: savedCartItems });
        }
      );
    },
  },
  // getters
  getters: {
    cartProducts: (state) => {
      return state.items.map(({ id, quantity }) => {
        const product = state.products.find((product) => product.id === id);
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
        };
      });
    },

    cartTotalPrice: (state, getters) => {
      return getters.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    },
  },
  modules: {},
});
