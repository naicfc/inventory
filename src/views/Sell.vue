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

    <div class="py-4">
      <fwb-table hoverable class="box">
        <fwb-table-head>
          <fwb-table-head-cell>ID</fwb-table-head-cell>
          <fwb-table-head-cell>Name</fwb-table-head-cell>
          <fwb-table-head-cell>Retail</fwb-table-head-cell>
          <fwb-table-head-cell>Wholesale</fwb-table-head-cell>
          <fwb-table-head-cell class="text-center">Actions</fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row v-for="(product, index) in searchList">
            <fwb-table-cell>{{ index + 1 }}</fwb-table-cell>
            <fwb-table-cell>{{ product.name }}</fwb-table-cell>
            <fwb-table-cell>
              GHC {{ product.unitPrices.retailPrice.toFixed(2) }}
            </fwb-table-cell>
            
            <fwb-table-cell>
              GHC {{ product.unitPrices.wholesalePrice.toFixed(2) }}
            </fwb-table-cell>
            <fwb-table-cell>
              <div class="text-center">
                <button class="blue-button px-4" @click="openmodal(product)">
                  View
                </button>
              </div>
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
    </div>
  </div>

  <Batch
    v-if="showBatchModal"
    @closeModal="closeModal"
    :product="selectedProduct" />
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
import { useNotification } from "@kyvg/vue3-notification";
import Batch from "@/components/global/Batch.vue";

const { notify } = useNotification();
const productStore = useProductStore();
const products = ref(productStore.products);
const selectedCategory = ref("");
const search = ref("");
const cartStore = useCartStore();
const quantity = ref(Array(products.value?.length).fill(0));
const selectedSaleType = ref(Array(products.value?.length).fill("retail"));
const selectedProduct = ref({});
const showBatchModal = ref(false);

const openmodal = (product) => {
  selectedProduct.value = product;
  showBatchModal.value = true;
};

const closeModal = () => {
  showBatchModal.value = false;
};

const increaseQuantity = (index) => {
  quantity.value[index] += 1;
  console.log(quantity.value);
};

const decreaseQuantity = (index) => {
  quantity.value[index] -= 1;
  console.log(quantity.value);
};

const addToCart = (product, index) => {
  if (quantity.value[index] <= 0) {
    notify({
      type: "error",
      title: "Warning",
      text: `Quantity of ${product.name} cannot be zero or less`,
      duration: 3000,
    });

    return true;
  }
  const saleType = selectedSaleType.value[index];
  const price =
    saleType === "retail"
      ? product.unitPrices.retailPrice
      : product.unitPrices.wholesalePrice;

  const subTotal = price * quantity.value[index];
  const discount = (product.discountPercentage / 100) * subTotal;
  const total = subTotal - discount;

  const data = {
    id: product._id,
    name: product.name,
    type: saleType,
    quantity: quantity.value[index],
    price: price,
    total: total,
    discount: discount,
  };

  console.log(data);

  cartStore.cart.unshift(data);

  notify({
    type: "success",
    title: "Success",
    text: `${product.name} has been added to cart`,
  });
};

watch(search, () => {
  console.log("watch triggered");
});

watchEffect(() => {
  console.log("watch effect triggerd");
});

const searchList = computed(() => {
  return products.value?.filter((product) =>
    product.name.toLowerCase().includes(search.value),
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
