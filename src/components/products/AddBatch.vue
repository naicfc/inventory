<template>
  <div>
    <div class="w-full">
      <form
        action=""
        @submit.prevent
        @submit="handleSubmit"
        class="border-2 rounded border-gray-300 p-4 flex flex-col gap-4 box-border bg-[--background-color]">
        <div>
          <span class="font-semibold blue">Add New Batch</span>
        </div>
        <div class="w-full">
          <label for="" class="block">Product</label>
          <select id="product" v-model="productID" class="form-input" required>
            <option value="" selected disabled>Select Category</option>
            <option
              v-for="product in products"
              :value="product._id"
              :key="product._id">
              {{ product.name }}
            </option>
          </select>
        </div>
        <div class="w-full">
          <label for="" class="block">Batch Number</label>
          <input
            placeholder=""
            id="batchNumber"
            type="text"
            class="form-input"
            v-model="batchNumber"
            required />
        </div>
        <div class="w-full">
          <label for="" class="block">Quantity</label>
          <input
            placeholder=""
            id="quantity"
            type="number"
            class="form-input"
            v-model="quantity"
            required />
        </div>
        <div class="w-full">
          <label for="" class="block">Expiry Date</label>
          <input
            placeholder=""
            id="date"
            type="date"
            class="form-input"
            v-model="expiryDate"
            required />
        </div>

        <button class="blue-button p-3" type="submit" :disabled="loading">
          <div class="flex gap-2 items-center justify-center">
            <fwb-spinner color="gray" size="4" v-if="loading" />
            <p>Add Batch</p>
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";
import { FwbSpinner } from "flowbite-vue";
import { ref } from "vue";
import { useProductStore } from "@/stores/products";

const productStore = useProductStore();
const products = ref(productStore.products);
const { notify } = useNotification();
const disabled = ref(false);
const loading = ref(false);
const batchNumber = ref("");
const expiryDate = ref("");
const quantity = ref("");
const productID = ref("");

const handleSubmit = () => {
  disabled.value = true;
  loading.value = true;

  try {
    const expiryDateObject = new Date(expiryDate.value);

    const id = productID.value;

    const data = {
      batchNumber: batchNumber.value,
      quantity: quantity.value,
      expiryDate: expiryDateObject,
    };

    console.log(data);

    productStore
      .addBatch(id, data)
      .then((res) => {
        setTimeout(() => {
          disabled.value = false;
          loading.value = false;
          notify({
            type: "success",
            title: "Success",
            text: `Batch added successfully`,
          });
        }, 2000);
      })
      .catch((error) => {
        notify({
          type: "error",
          title: "Something Went wrong",
          text: error.message,
        });
      });
  } catch (error) {
    console.error("Error:", error);
    disabled.value = false;
    notify({
      type: "error",
      title: "Something Went wrong",
      text: error,
    });
  }
};
</script>

<style lang="scss" scoped></style>
