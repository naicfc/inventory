<template>
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="header">Products</h1>
    </div>
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <select name="category" id="category" class="form-input">
          <option value="" disabled selected>Filter By Categories</option>
        </select>
        <button class="green-button px-3" @click="openModal('category')">
          New Category
        </button>
      </div>

      <div class="flex gap-2">
        <button class="orange-button px-3 py-1" @click="openModal('product')">
          New Product
        </button>
        <button class="blue-button px-3 py-1">Import Products</button>
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
          <fwb-table-head-cell>Actions</fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row v-for="(product, index) in products">
            <fwb-table-cell>{{ index }}</fwb-table-cell>
            <fwb-table-cell>{{ product.name }}</fwb-table-cell>
            <fwb-table-cell>{{ product.categoryID.name }}</fwb-table-cell>
            <fwb-table-cell>{{ product.quantity }}</fwb-table-cell>
            <fwb-table-cell>
              GHC {{ product.unitPrices.retailPrice.toFixed(2) }}
            </fwb-table-cell>
            <fwb-table-cell>
              <div class="flex gap-2">
                <div class="flex gap-1 items-center cursor-pointer">
                  <img src="../assets/icons/edit.svg" width="24" alt="" />
                  <p>Edit</p>
                </div>
                <div
                  class="flex gap-1 items-center cursor-pointer text-red-500">
                  <img src="../assets/icons/bin.svg" width="19" alt="" />
                  <p>Delete</p>
                </div>
              </div>
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
    </div>
  </div>

  <NewProduct v-if="showProductsModal" @closeModal="closeModal" />
  <NewCategory v-if="showCategoryModal" @closeModal="closeModal" />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
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
import NewProduct from "@/components/products/NewProduct.vue";
import NewCategory from "@/components/products/NewCategory.vue";

const showProductsModal = ref(false);
const showCategoryModal = ref(false);
const productStore = useProductStore();
const products = ref(null);

const openModal = (name) => {
  if (name == "category") {
    showCategoryModal.value = true;
  }
  if (name == "product") {
    showProductsModal.value = true;
  }
};

const closeModal = () => {
  showCategoryModal.value = false;
  showProductsModal.value = false;
};

onBeforeMount(() => {
  productStore.getProducts().then((data) => {
    products.value = data;
  });
});
</script>
