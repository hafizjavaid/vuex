<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price | currency }}
      <!-- <br /> -->
      <button :disabled="!product.inventory" @click="addProductToCart(product)">
        Add to cart
      </button>
      <!-- <button>Add to Cart</button> -->
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["products"]),
  },
  methods: {
    ...mapActions(["addProductToCart"]),
  },
  created() {
    this.$store.dispatch("getAllProducts");
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  li {
    display: flex;
    margin: 10px auto;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
