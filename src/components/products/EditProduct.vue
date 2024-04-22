<template>
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="header">Edit Product</h1>
    </div>
    <div>
      {{ product }}
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/products";
import { onBeforeMount, onUnmounted, ref } from "vue";

const productStore = useProductStore();
const product = ref(null);

onBeforeMount(() => {
  product.value = productStore.selectedProductForEdit;
});
onUnmounted(() => {
  product.value = null;
});
</script>

