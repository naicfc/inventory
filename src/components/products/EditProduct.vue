<template>
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="header">Edit Product</h1>
    </div>
    <div class="grid grid-cols-5 gap-8">
      <div class="col-span-3">
        <div>
          <div class="w-full">
            <form
              action=""
              @submit.prevent
              @submit="handleSubmit"
              class="border-2 rounded border-gray-300 p-4 flex flex-col gap-4 box-border bg-[--background-color]">
              <div>
                <span class="font-semibold blue">Product Details</span>
              </div>
              <div class="flex gap-4">
                <div class="w-full">
                  <label for="name" class="block">Name</label>
                  <input
                    placeholder=""
                    type="text"
                    id="name"
                    class="form-input"
                    v-model="product.name"
                    required />
                </div>
                <div class="w-full">
                  <label for="" class="block">Description</label>
                  <input
                    placeholder=""
                    id="description"
                    type="text"
                    class="form-input"
                    v-model="product.description"
                    required />
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
                    v-model="product.unitPrices.retailPrice"
                    required />
                </div>
                <div class="w-full">
                  <label for="wholesalePrice" class="block">
                    Wholesale Price
                  </label>
                  <input
                    placeholder=""
                    id="wholesalePrice"
                    type="text"
                    pattern="[0-9]+(\.[0-9]+)?"
                    class="form-input"
                    v-model="product.unitPrices.wholesalePrice"
                    required />
                </div>
              </div>

              <div class="flex gap-4">
                <div class="w-full">
                  <label for="unit" class="block">Unit</label>
                  <select
                    name="unit"
                    id="unit"
                    v-model="product.defaultUnit"
                    class="form-input">
                    <option value="" selected disabled>Select Unit</option>
                    <option
                      v-for="unit in units"
                      :value="unit.name"
                      :key="unit._id">
                      {{ unit.name }}
                    </option>
                  </select>
                </div>
                <div class="w-full">
                  <label for="expiryDate" class="block">Wholsesale Unit</label>
                  <select
                    name="unit"
                    id="unit"
                    v-model="product.wholesaleUnit"
                    class="form-input">
                    <option value="" selected disabled>Select Unit</option>
                    <option
                      v-for="unit in units"
                      :value="unit.name"
                      :key="unit._id">
                      {{ unit.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="w-[50%]">
                  <label for="quantity" class="block">
                    Wholesale Conversion Rate
                  </label>
                  <input
                    placeholder=""
                    type="number"
                    id="quantity"
                    v-model="product.conversionRate"
                    class="form-input"
                    required />
                </div>
              </div>

              <div class="flex flex-col gap-4">
                <p class="font-semibold blue text-sm">Existing Batches</p>

                <div
                  class="flex gap-2 items-end"
                  v-for="(batch, index) in product.batches"
                  :key="index">
                  <div class="w-full">
                    <label for="" class="block">Batch Number</label>
                    <input
                      placeholder=""
                      id="batchNumber"
                      type="text"
                      class="form-input"
                      v-model="batch.batchNumber"
                      required />
                  </div>
                  <div class="w-full">
                    <label for="" class="block">Quantity</label>
                    <input
                      placeholder=""
                      id="quantity"
                      type="number"
                      class="form-input"
                      v-model="batch.quantity"
                      required />
                  </div>
                  <div class="w-full">
                    <label for="" class="block">Expiry Date</label>
                    <input
                      placeholder=""
                      id="date"
                      type="date"
                      class="form-input"
                      :value="formatDate(batch.expiryDate)"
                      @input="updateDate(index, $event.target.value)"
                      required />
                  </div>
                  <div @click="deleteBatch(index)" class="cursor-pointer">
                    <img src="../../assets/icons/bin.svg" width="100" alt="" />
                  </div>
                </div>
              </div>

              <button class="blue-button p-3" type="submit" :disabled="loading">
                <div class="flex gap-2 items-center justify-center">
                  <fwb-spinner color="gray" size="4" v-if="loading" />
                  <p>Update Product</p>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div>
          <div class="w-full">
            <form
              action=""
              @submit.prevent
              @submit="addBatch"
              class="border-2 rounded border-gray-300 p-4 flex flex-col gap-4 box-border bg-[--background-color]">
              <div>
                <span class="font-semibold blue">Add New Batch</span>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/products";
import { onBeforeMount, onUnmounted, ref } from "vue";
import { useQuantityUnitStore } from "@/stores/quantityUnits.js";
import { FwbSpinner } from "flowbite-vue";
import { useNotification } from "@kyvg/vue3-notification";

const productStore = useProductStore();
const { notify } = useNotification();
const product = ref(null);
const batches = ref([]);
const batchNumber = ref("");
const quantity = ref(0);
const expiryDate = ref("");
const loading = ref(false);

const quantityStore = useQuantityUnitStore();
const units = quantityStore.units;
const handleSubmit = () => {
  loading.value = true;
  console.log(product.value);

  productStore.updateProduct(product.value._id, product.value);
};

const formatDate = (date) => {
  return date ? new Date(date).toISOString().split("T")[0] : "";
};

const addBatch = () => {
  loading.value = true;
  const data = {
    batchNumber: batchNumber.value,
    quantity: quantity.value,
    expiryDate: new Date(expiryDate.value),
  };

  productStore
    .addBatch(product.value._id, data)
    .then((res) => {
      setTimeout(() => {
        product.value = res;
        loading.value = false;
        console.log(product.value);
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
  batchNumber.value = "";
  quantity.value = 0;
  expiryDate.value = "";
  console.log(product.value);
};

const deleteBatch = (index) => {
  if (window.confirm("Delete Batch?")) {
    product.value.batches.splice(index, 1);
  }
};

const updateDate = (index, value) => {
  product.value.batches[index].expiryDate = value;
};

onBeforeMount(() => {
  product.value = productStore.selectedProductForEdit;
});
onUnmounted(() => {
  product.value = null;
});
</script>
