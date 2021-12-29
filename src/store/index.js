import { createLogger } from "vuex";
import Vuex from "vuex";
import cart from "./modules/cart";
import products from "./modules/products";

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    cart,
    products,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
