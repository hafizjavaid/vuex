<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ currency(product.price) }}
      <!-- <br /> -->
      <button :disabled="!product.inventory" @click="addProductToCart(product)">
        Add to cart
      </button>
      <!-- <button>Add to Cart</button> -->
    </li>
  </ul>
</template>

<script>
// import { mapState, mapActions } from "vuex";
// export default {
//   computed: {
//     ...mapState(["products"]),
//   },
//   methods: {
//     ...mapActions(["addProductToCart"]),
//   },
//   created() {
//     this.$store.dispatch("getAllProducts");
//   },
// };

import { computed } from "vue";
import { useStore } from "vuex";
import { currency } from "../currency";

export default {
  setup() {
    const store = useStore();

    const products = computed(() => store.state.products.all);

    const addProductToCart = (product) =>
      store.dispatch("cart/addProductToCart", product);

    store.dispatch("products/getAllProducts");

    return {
      products,
      addProductToCart,
      currency,
    };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
li {
  display: flex;
  margin: 10px auto;
  justify-content: space-between;
  align-items: center;
}
</style>
