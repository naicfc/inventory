<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="header">Cart</h1>
      </div>
    </div>
    <div
      class="h-[50vh] flex items-center justify-center"
      v-if="cart.length == 0">
      <div>
        <p>No items in the cart</p>
      </div>
    </div>
    <div class="bg-[#fffdfd] shadow grid grid-cols-3 my-4" v-else>
      <div class="p-8 col-span-2">
        <div
          class="flex items-center justify-between border-b pb-4 border-gray-400">
          <h2 class="text-lg font-bold">Item List</h2>
          <h2 class="text-lg font-bold">
            {{ itemCount }}
            <span class="text-sm text-gray-600">Items</span>
          </h2>
        </div>
        <div class="py-4">
          <fwb-table hoverable class="">
            <fwb-table-head class="text-center">
              <fwb-table-head-cell></fwb-table-head-cell>
              <fwb-table-head-cell class="text-left">Name</fwb-table-head-cell>
              <fwb-table-head-cell>Price</fwb-table-head-cell>
              <fwb-table-head-cell>Quantity</fwb-table-head-cell>
              <fwb-table-head-cell>Off</fwb-table-head-cell>
              <fwb-table-head-cell class="text-right">
                Total
              </fwb-table-head-cell>
            </fwb-table-head>
            <fwb-table-body class="text-center">
              <fwb-table-row v-for="(item, index) in cart">
                <fwb-table-cell>
                  <div class="cursor-pointer">
                    <img
                      src="../assets/icons/circle-xmark-regular.svg"
                      alt=""
                      width="20"
                      @click="removeItem(item)" />
                  </div>
                </fwb-table-cell>
                <fwb-table-cell class="text-left">
                  <div>
                    <p>{{ item.name }}</p>
                    <p class="text-xs text-gray-400">{{ item.type }}</p>
                  </div>
                </fwb-table-cell>
                <fwb-table-cell>
                  {{ item.price.toFixed(2) }}
                </fwb-table-cell>
                <fwb-table-cell>
                  {{ item.quantity }}
                </fwb-table-cell>
                <fwb-table-cell>{{ item.discount }}</fwb-table-cell>
                <fwb-table-cell>{{ item.total.toFixed(2) }}</fwb-table-cell>
              </fwb-table-row>
            </fwb-table-body>
          </fwb-table>
        </div>
        <div>
          <div class="flex justify-end">
            <button class="text-red-500 px-3" @click="clearList">
              Clear List
            </button>
          </div>
        </div>
      </div>
      <div class="p-8 bg-gray-300">
        <div class="border-b pb-4 border-gray-400">
          <h2 class="text-lg font-bold">Order Summary</h2>
        </div>
        <div class="py-4">
          <div class="flex flex-col gap-4 mb-4 py-2">
            <div class="flex items-center justify-between">
              <p>Sub Total:</p>
              <p>GHC {{ subTotal.toFixed(2) }}</p>
            </div>
            <div class="flex items-center justify-between">
              <p>Discount:</p>
              <p>GHC {{ discount.toFixed(2) }}</p>
            </div>
            <div class="flex items-center justify-between">
              <p>
                VAT
                <span class="text-gray-600">(2%)</span>
                :
              </p>
              <p class="text-red-500">GHC {{ VAT.toFixed(2) }}</p>
            </div>
            <div>
              <p class="mb-2">Promo Code:</p>
              <form
                class="flex items-center justify-between gap-4"
                @submit.prevent>
                <input
                  type="text"
                  name="promo-code"
                  id="promo-code"
                  placeholder="Enter your code"
                  class="form-input" />
                <button class="green-button px-3">APPLY</button>
              </form>
            </div>
          </div>
          <div class="border-t-2 border-gray-300 py-4">
            <div class="flex items-center justify-between mb-4 font-bold">
              <p>Total:</p>
              <p>GHC {{ total.toFixed(2) }}</p>
            </div>
            <button class="blue-button p-2 w-full" @click="createTransaction">
              <div class="flex gap-2 items-center justify-center">
                <fwb-spinner color="gray" size="4" v-if="loading" />
                <p>CHECKOUT</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { onBeforeMount, ref, computed, watch } from "vue";
import {
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from "flowbite-vue";
import { useTransactionStore } from "@/stores/transaction";
import { useNotification } from "@kyvg/vue3-notification";
import router from "@/router";
import { FwbSpinner } from "flowbite-vue";
import { useProductStore } from "@/stores/products";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const cart = ref(cartStore.cart);
const transactionStore = useTransactionStore();
const { notify } = useNotification();
const loading = ref(false);
const subTotal = computed(() => {
  let total = 0;
  cart.value.forEach((item) => {
    total += item.total;
  });
  return total;
});

const discount = computed(() => {
  let discount = 0;
  cart.value.forEach((item) => {
    discount += item.discount;
  });
  return discount;
});

const VAT = computed(() => {
  return subTotal.value * 0.1;
});

const total = computed(() => {
  return subTotal.value + VAT.value - discount.value;
});

watch(
  () => cartStore.cart,
  (newData) => {
    cart.value = newData;
  },
);

const itemCount = computed(() => {
  return cart.value?.length;
});

const clearList = () => {
  if (window.confirm("Are you sure you want to clear the list?")) {
    cartStore.resetState().then((res) => {
      notify({
        type: "warning",
        title: "Success",
        text: res,
      });
    });
  }
};

const createTransaction = () => {
  const userID = authStore.user.id;
  const data = {
    paymentMethod: "cash",
    products: cart.value,
    subTotal: subTotal.value,
    discount: discount.value,
    VAT: VAT.value,
    total: total.value,
    userID: userID,
  };

  try {
    loading.value = true;
    transactionStore
      .createTransaction(data)
      .then((data) => {
        setTimeout(() => {
          loading.value = false;
          notify({
            type: "success",
            title: "Success",
            text: `transaction processed successfully`,
          });
          cartStore.resetState().then((res) => {
            notify({
              type: "warning",
              title: "Success",
              text: res,
            });
          });
          productStore.getProducts();
          router.push("/transactions");
        }, 2000);
      })
      .catch((error) => {
        notify({
          type: "error",
          title: "Something Went wrong",
          text: error,
        });
        loading.value = false;
      });
  } catch (error) {
    notify({
      type: "error",
      title: "Something Went wrong",
      text: error,
    });
    loading.value = false;
  }

  console.log(data);
};

const removeItem = (item) => {
  if (window.confirm("Are you sure you want to remove item?")) {
    cartStore.removeItem(item.productId);
  }
};

onBeforeMount(() => {
  console.log(cartStore.cart);
});
</script>
