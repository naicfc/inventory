<template>
  <div
    class="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-[99] p-4 bg-black/70">
    <div class="w-full sm:max-w-[80%]">
      <div
        class="border-2 rounded border-gray-300 p-4 flex flex-col gap-4 box-border bg-[--background-color]">
        <div class="flex justify-between">
          <span class="font-semibold blue">Add Batch To Cart</span>
          <img
            src="../../assets/icons/circle-xmark-regular.svg"
            width="20"
            alt=""
            class="cursor-pointer"
            @click="closeModal" />
        </div>

        <div class="py-4">
          <fwb-table hoverable class="box">
            <fwb-table-head>
              <fwb-table-head-cell>#</fwb-table-head-cell>
              <fwb-table-head-cell>Batch Number</fwb-table-head-cell>
              <fwb-table-head-cell>Stock</fwb-table-head-cell>
              <fwb-table-head-cell>Expiry Date</fwb-table-head-cell>
              <fwb-table-head-cell>Type Of sale</fwb-table-head-cell>
              <fwb-table-head-cell>Quantity</fwb-table-head-cell>
              <fwb-table-head-cell class="text-center">
                Actions
              </fwb-table-head-cell>
            </fwb-table-head>
            <fwb-table-body>
              <fwb-table-row v-for="(product, index) in props.product.batches">
                <fwb-table-cell>{{ index + 1 }}</fwb-table-cell>
                <fwb-table-cell>{{ product.batchNumber }}</fwb-table-cell>
                <fwb-table-cell>
                  {{ product.quantity }} pcs. ({{
                    product.quantity / props.product.conversionRate
                  }}) whsl
                </fwb-table-cell>
                <fwb-table-cell>
                  {{ formatDate(product.expiryDate) }}
                </fwb-table-cell>
                <fwb-table-cell>
                  <form action="">
                    <div class="flex gap-2">
                      <input
                        type="radio"
                        v-model="selectedSaleType[index]"
                        value="retail"
                        :id="'retail' + index" />
                      <label :for="'retail' + index">Retail</label>
                      <input
                        type="radio"
                        v-model="selectedSaleType[index]"
                        value="wholesale"
                        :id="'wholesale' + index" />
                      <label :for="'wholesale' + index">Wholesale</label>
                    </div>
                  </form>
                </fwb-table-cell>
                <fwb-table-cell>
                  <div class="flex gap-2 items-center">
                    <div
                      class="box w-6 h-6 flex items-center justify-center cursor-pointer"
                      @click="increaseQuantity(index)">
                      <p>+</p>
                    </div>
                    {{ quantity[index] }}
                    <div
                      class="box w-6 h-6 flex items-center justify-center cursor-pointer"
                      @click="decreaseQuantity(index)">
                      <p>-</p>
                    </div>
                  </div>
                </fwb-table-cell>
                <fwb-table-cell>
                  <div class="text-center">
                    <button
                      class="blue-button px-4"
                      @click="addToCart(product, index)">
                      Add
                    </button>
                  </div>
                </fwb-table-cell>
              </fwb-table-row>
            </fwb-table-body>
          </fwb-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
import { onBeforeMount, ref } from "vue";

const props = defineProps({
  product: Object,
});

const { notify } = useNotification();
const cartStore = useCartStore();
const emit = defineEmits(["closeModal"]);
const quantity = ref(Array(props.product.batches.length).fill(0));
const selectedSaleType = ref(
  Array(props.product.batches.length).fill("retail"),
);

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

const increaseQuantity = (index) => {
  quantity.value[index] += 1;
  console.log(quantity.value);
};

const decreaseQuantity = (index) => {
  quantity.value[index] -= 1;
  console.log(quantity.value);
};

const closeModal = () => {
  emit("closeModal");
};

const addToCart = (product, index) => {
  if (quantity.value[index] <= 0) {
    notify({
      type: "error",
      title: "Warning",
      text: `Quantity of ${props.product.name} cannot be zero or less`,
      duration: 3000,
    });

    return true;
  }

  if (quantity.value[index] > product.quantity) {
    notify({
      type: "error",
      title: "Warning",
      text: `Quantity cannot be more than available stock`,
      duration: 3000,
    });

    return true;
  }

  const wholsalequantity = product.quantity / props.product.conversionRate;

  if (
    selectedSaleType.value[index] === "wholesale" &&
    quantity.value[index] > wholsalequantity
  ) {
    notify({
      type: "error",
      title: "Warning",
      text: `Quantity cannot be more than available stock`,
      duration: 3000,
    });

    return true;
  }

  const saleType = selectedSaleType.value[index];
  const price =
    saleType === "retail"
      ? props.product.unitPrices.retailPrice
      : props.product.unitPrices.wholesalePrice;

  const subTotal = price * quantity.value[index];
  const discount = (props.product.discountPercentage / 100) * subTotal;
  const total = subTotal - discount;

  const data = {
    productId: props.product._id,
    name: props.product.name,
    type: saleType,
    quantity: quantity.value[index],
    price: price,
    total: total,
    discount: discount,
    batchNumber: product.batchNumber,
  };

  console.log(data);

  cartStore.cart.unshift(data);

  notify({
    type: "success",
    title: "Success",
    text: `${props.product.name} has been added to cart`,
  });
};

onBeforeMount(() => {
  console.log(props.product);
});
</script>
