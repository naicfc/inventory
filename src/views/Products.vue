<template>
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="header">Products</h1>
    </div>
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <select
          name="category"
          id="category"
          class="form-input"
          v-model="selectedCategory"
          @change="filterProducts">
          <option value="" disabled selected>Filter by categories</option>
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :key="category._id"
            :value="category._id">
            {{ category.name }}
          </option>
        </select>
        <button class="green-button px-3 w-full" @click="openModal('category')">
          New Category
        </button>
      </div>

      <div class="flex gap-2">
        <RouterLink to="/products/add-product">
          <button class="orange-button px-3 py-1">New Product</button>
        </RouterLink>

        <button class="blue-button px-3 py-1">Import Products</button>
      </div>
    </div>

    <div class="py-4">
      <fwb-table hoverable class="box">
        <fwb-table-head class="text-center">
          <fwb-table-head-cell>ID</fwb-table-head-cell>
          <fwb-table-head-cell>Name</fwb-table-head-cell>
          <fwb-table-head-cell>Category</fwb-table-head-cell>
          <fwb-table-head-cell>Quantity</fwb-table-head-cell>
          <fwb-table-head-cell>Retail</fwb-table-head-cell>
          <fwb-table-head-cell>Wholesale</fwb-table-head-cell>
          <fwb-table-head-cell>Stock Level</fwb-table-head-cell>
          <fwb-table-head-cell>Actions</fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body class="text-center">
          <fwb-table-row v-for="(product, index) in filteredList">
            <fwb-table-cell>{{ index }}</fwb-table-cell>
            <fwb-table-cell>{{ product.name }}</fwb-table-cell>
            <fwb-table-cell>{{ product.categoryID?.name }}</fwb-table-cell>
            <fwb-table-cell>{{ qetQuantity(product) }}</fwb-table-cell>
            <fwb-table-cell>
              GHC {{ product.unitPrices.retailPrice.toFixed(2) }}
            </fwb-table-cell>
            <fwb-table-cell>
              GHC {{ product.unitPrices.wholesalePrice.toFixed(2) }}
            </fwb-table-cell>
            <fwb-table-cell>
              <div class="bg-green-500 rounded-full text-center">
                <p class="text-white">In Stock</p>
              </div>
            </fwb-table-cell>
            <fwb-table-cell>
              <div class="flex gap-2">
                <div
                  class="flex gap-1 items-center cursor-pointer"
                  @click="editProduct(product)">
                  <img src="../assets/icons/edit.svg" width="24" alt="" />
                  <p>Edit</p>
                </div>
                <div
                  @click="deleteProduct(product)"
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

  <NewCategory v-if="showCategoryModal" @closeModal="closeModal" />
</template>

<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useProductStore } from "@/stores/products";
import { useCategoryStore } from "@/stores/categories.js";
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from "flowbite-vue";
import NewCategory from "@/components/products/NewCategory.vue";
import { useNotification } from "@kyvg/vue3-notification";
import router from "@/router";

const showProductsModal = ref(false);
const showCategoryModal = ref(false);
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const products = ref(productStore.products);
const categories = ref(categoryStore.categories);
const selectedCategory = ref("");
const { notify } = useNotification();

const openModal = (name) => {
  if (name == "category") {
    showCategoryModal.value = true;
  }
  if (name == "product") {
    showProductsModal.value = true;
  }
};

const filterProducts = () => {
  console.log(selectedCategory.value);
};

const filteredList = computed(() => {
  if (selectedCategory.value == "") {
    return products.value;
  } else {
    let filtered = [];
    products.value.forEach((item) => {
      if (item.categoryID._id == selectedCategory.value) {
        filtered.push(item);
      }
    });

    console.log(filtered);

    return filtered;
  }
});

const qetQuantity = (product) => {
  let total = 0;
  product?.batches.forEach((element) => {
    total += element.quantity;
  });

  return total;
};

const closeModal = () => {
  showCategoryModal.value = false;
  showProductsModal.value = false;
};

const deleteProduct = (product) => {
  if (
    window.confirm(
      "Do you want to delete" +
        " " +
        product.name +
        "?" +
        " " +
        "This action cannot be undone",
    )
  ) {
    console.log("deleted:", product);
    productStore
      .deleteProduct(product._id)
      .then((res) => {
        console.log(res);
        notify({
          type: "success",
          title: "Success",
          text: `${res.name} deleted successfully`,
        });
      })
      .catch((error) => {
        console.log(error);
        notify({
          type: "error",
          title: "Something Went wrong",
          text: error,
        });
      });
  }
};

const editProduct = (product) => {
  productStore.selectedProductForEdit = product;
  router.push("/products/edit");
};

onBeforeMount(() => {
  if (productStore.products !== null) {
    productStore.getProducts().then((data) => {
      products.value = data;
    });
  }
  console.log(products.value);
  if (categoryStore.categories == null) {
    categoryStore.getCategories().then((data) => {
      categories.value = data;
    });
  }
});
</script>
