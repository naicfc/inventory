<template>
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="header">New Product</h1>
    </div>
    <div class="grid grid-cols-5 gap-8">
      <div class="col-span-3">
        <NewProduct />
      </div>
      <div class="col-span-2">
        <!-- <AddBatch /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import NewProduct from "@/components/products/NewProduct.vue";
import AddBatch from "@/components/products/AddBatch.vue";
</script>
