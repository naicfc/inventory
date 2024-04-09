<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="header">Sell</h1>
      </div>

      <div class="flex gap-2">
        <input
          v-model="search"
          type="text"
          placeholder="Search product name"
          class="rounded-full border-2 border-gray-300 bg-white w-72 text-sm" />
        <button
          class="rounded-full bg-[--primary-blue] text-white px-4 text-sm">
          Search
        </button>
      </div>
    </div>

    <div>
      <fwb-table hoverable class="box">
        <fwb-table-head>
          <fwb-table-head-cell>ID</fwb-table-head-cell>
          <fwb-table-head-cell>Name</fwb-table-head-cell>
          <fwb-table-head-cell>Category</fwb-table-head-cell>
          <fwb-table-head-cell>Quantity</fwb-table-head-cell>
          <fwb-table-head-cell>Price</fwb-table-head-cell>
          <fwb-table-head-cell>Price</fwb-table-head-cell>
          <fwb-table-head-cell class="text-center">Actions</fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row v-for="(product, index) in searchList">
            <fwb-table-cell>{{ index + 1 }}</fwb-table-cell>
            <fwb-table-cell>{{ product.name }}</fwb-table-cell>
            <fwb-table-cell>{{ product.categoryID.name }}</fwb-table-cell>
            <fwb-table-cell>{{ product.quantity }}</fwb-table-cell>
            <fwb-table-cell>
              GHC {{ product.unitPrices.retailPrice.toFixed(2) }}
            </fwb-table-cell>
            <fwb-table-cell>
              <form action="">
                <div class="flex gap-2">
                  <input type="radio" name="type" id="type" />Retail
                  <input type="radio" name="type" id="type" /> Wholesale
                </div>
              </form>
            </fwb-table-cell>
            <fwb-table-cell>
              <div class="text-center">
                <button class="blue-button px-4" @click="addToCart(product)">
                  Add To Cart
                </button>
              </div>
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed, watch, watchEffect } from "vue";
import { useProductStore } from "@/stores/products";
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from "flowbite-vue";
import { useCartStore } from "@/stores/cart";

const productStore = useProductStore();
const products = ref(productStore.products);
const selectedCategory = ref("");
const search = ref("");
const cartStore = useCartStore();

const addToCart = (product) => {
  console.log(product);
  cartStore.cart.push(product);
};

watch(search, () => {
  console.log("watch triggered");
});

watchEffect(() => {
  console.log("watch effect triggerd");
});

const searchList = computed(() => {
  return products.value?.filter((product) =>
    product.name.includes(search.value),
  );
});

onBeforeMount(() => {
  if (productStore.products == null) {
    productStore.getProducts().then((data) => {
      products.value = data;
    });
  }
});
</script>
