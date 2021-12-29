<template>
  <div id="app">
    <h1>Shopping Cart Example</h1>
    <hr />
    <div class="container">
      <div class="products">
        <h2>Products</h2>
        <product-list></product-list>
      </div>
      <div class="shoppingCart">
        <h2>Shopping Cart</h2>
        <shopping-cart></shopping-cart>
      </div>
    </div>
  </div>
</template>
<script>
import ProductList from "./components/ProductList.vue";
import ShoppingCart from "./components/ShoppingCart.vue";

export default {
  components: { ProductList, ShoppingCart },
};
</script>
<style lang="scss">
.container {
  max-width: 1000px;
  margin: auto;
  padding: 10px;
  width: 100%;
}
h1,
h2 {
  text-align: center;
}
</style>
