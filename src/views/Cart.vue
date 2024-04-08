<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="header">Cart</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { onBeforeMount } from "vue";

const cartStore = useCartStore();

onBeforeMount(() => {
  console.log(cartStore.cart);
});
</script>
