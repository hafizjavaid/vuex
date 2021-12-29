import shop from "../../api/shop";

export default {
  namespaced: true,
  state: {
    products: [],
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
  },
  actions: {
    // Products Actions
    getAllProducts({ commit }) {
      shop.getProducts((products) => {
        console.log(products);
        commit("SET_PRODUCTS", products);
      });
    },
  },
  getters: {
    getProducts: (state) => {
      return state.products;
    },
  },
};
