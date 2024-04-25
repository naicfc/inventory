<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="header">Expiring</h1>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-8">
      <div class="gray-border">
        <div>
          <h1 class="sub-header">Expiring Products</h1>
        </div>
        <div v-for="product in expiringBatches">
          <div class="grid grid-cols-3 items-center mb-4 box p-2">
            <p class="text-xs capitalize">
              {{ product.productName }}
            </p>
            <p class="font-medium text-center text-gray-400">
              {{ product.batchNumber }}
            </p>
            <div class="">
              <p class="font-semibold text-xs text-right">
                {{ formatDate(product.expiryDate) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="gray-border">
        <div>
          <h1 class="sub-header">Expired Products</h1>
        </div>
        <div v-for="product in expiredBatches">
          <div class="grid grid-cols-3 items-center mb-4 box p-2">
            <p class="text-xs capitalize">
              {{ product.productName }}
            </p>
            <p class="font-medium text-center text-gray-400">
              {{ product.batchNumber }}
            </p>
            <div class="">
              <p class="font-semibold text-xs text-right">
                {{ formatDate(product.expiryDate) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/products";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { expiringBatches, expiredBatches } = storeToRefs(productStore);

const formatDate = (date) => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const currentDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    currentDate,
  );

  return formattedDate;
};
</script>
