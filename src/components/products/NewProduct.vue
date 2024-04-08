<template>
  <div
    class="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-[99] p-4 bg-black/70">
    <div class="w-full sm:max-w-[600px]">
      <form
        action=""
        @submit.prevent
        @submit="handleSubmit"
        class="border-2 rounded border-gray-300 p-4 flex flex-col gap-4 box-border bg-[--background-color]">
        <div class="flex justify-between">
          <span class="font-semibold blue">Add New Product</span>
          <img
            src="../../assets/icons/circle-xmark-regular.svg"
            width="20"
            alt=""
            class="cursor-pointer"
            @click="closeModal" />
        </div>

        <div class="flex gap-4">
          <div class="w-full">
            <label for="name" class="block">Name</label>
            <input
              placeholder=""
              type="text"
              id="name"
              class="form-input"
              v-model="name"
              required />
          </div>
          <div class="w-full">
            <label for="" class="block">Description</label>
            <input
              placeholder=""
              id="description"
              type="text"
              class="form-input"
              v-model="description"
              required />
          </div>
        </div>

        <div class="flex gap-4">
          <div class="w-full">
            <label for="quantity" class="block">Quantity</label>
            <input
              placeholder=""
              type="number"
              id="quantity"
              v-model="quantity"
              class="form-input"
              required />
          </div>
          <div class="w-full">
            <label for="category" class="block">Category</label>
            <select
              name="category"
              id="category"
              v-model="category"
              class="form-input">
              <option value="" selected disabled>Select Category</option>
              <option
                v-for="category in categories"
                :value="category._id"
                :key="category._id">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="w-full">
            <label for="retailPrice" class="block">Retail Price</label>
            <input
              placeholder=""
              type="text"
              pattern="[0-9]+(\.[0-9]+)?"
              id="retailPrice"
              class="form-input"
              v-model="retailPrice"
              required />
          </div>
          <div class="w-full">
            <label for="wholesalePrice" class="block">Wholesale Price</label>
            <input
              placeholder=""
              id="wholesalePrice"
              type="text"
              pattern="[0-9]+(\.[0-9]+)?"
              class="form-input"
              v-model="wholesalePrice"
              required />
          </div>
        </div>

        <div class="flex gap-4">
          <div class="w-full">
            <label for="unit" class="block">Unit</label>
            <select name="unit" id="unit" v-model="unit" class="form-input">
              <option value="" selected disabled>Select Unit</option>
              <option v-for="unit in units" :value="unit._id" :key="unit._id">
                {{ unit.name }}
              </option>
            </select>
          </div>
          <div class="w-full">
            <label for="expiryDate" class="block">Expiry Date</label>
            <input
              placeholder=""
              id="expiryDate"
              type="date"
              class="form-input"
              v-model="expiryDate"
              required />
          </div>
        </div>

        <button class="blue-button p-3" type="submit">
          <div class="flex gap-2 items-center justify-center">
            <fwb-spinner color="gray" size="4" v-if="loading" />
            <p>Add Product</p>
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { FwbSpinner } from "flowbite-vue";
import { useQuantityUnitStore } from "@/stores/quantityUnits.js";
import { useCategoryStore } from "@/stores/categories.js";
import { useProductStore } from "@/stores/products";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const quantityStore = useQuantityUnitStore();
const { notify } = useNotification();
const disabled = ref(false);
const loading = ref(false);
const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
const units = quantityStore.units;
const categories = categoryStore.categories;

const name = ref("");
const description = ref("");
const quantity = ref("");
const category = ref("");
const retailPrice = ref("");
const wholesalePrice = ref("");
const unit = ref("");
const expiryDate = ref("");

const handleSubmit = async () => {
  disabled.value = true;
  loading.value = true;

  try {
    const expiryDateObject = new Date(expiryDate.value);

    const data = {
      name: name.value,
      description: description.value,
      quantity: quantity.value,
      categoryID: category.value,
      unitPrices: {
        wholesalePrice: wholesalePrice.value,
        retailPrice: retailPrice.value,
      },
      defaultUnit: unit.value,
      expiryDate: expiryDateObject,
    };

    console.log(data);

    productStore
      .addProduct(data)
      .then((res) => {
        setTimeout(() => {
          disabled.value = false;
          loading.value = false;
          closeModal();
          notify({
            type: "success",
            title: "Success",
            text: `${res.name} added successfully`,
          });
        }, 2000);
      })
      .catch((error) => {
        notify({
          type: "error",
          title: "Something Went wrong",
          text: error,
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

onBeforeMount(() => {
  quantityStore
    .getQuantityUnits()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>
