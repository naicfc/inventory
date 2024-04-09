<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="header">Cart</h1>
      </div>
    </div>
    <div>
      <div v-for="item in cart" :key="item._id">
        <div>
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { onBeforeMount, ref } from "vue";

const cartStore = useCartStore();
const cart = ref(cartStore.cart);

onBeforeMount(() => {
  console.log(cartStore.cart);
});
</script>
