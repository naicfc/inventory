<template>
  <div class="flex items-center justify-center h-[60vh]" v-if="transactions.length <= 0">
    <p>No Transactions available</p>
  </div>
  <div class="flex flex-col gap-4" v-else>
    <div class="flex justify-between items-center">
      <div>
        <h1 class="header">Transactions</h1>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4 py-4">
      <div class="col-span-2 gray-border">
        <div class="flex justify-between items-center mb-6">
          <p class="sub-header">All Transactions</p>
          <div>
            <select name="transaction" id="transcation" class="form-input">
              <option value="all">All</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        <div v-for="transaction in transactions">
          <div class="flex justify-between items-center mb-4 box p-2">
            <p class="font-semibold capitalize">
              {{ transaction.transactionType }}
            </p>
            <p class="text-xs text-gray-400">
              {{ formatDate(transaction.transactionDate) }}
            </p>
            <div class="flex gap-4 items-center">
              <p class="font-semibold text-xs">GHC {{ transaction.totalPrice }}</p>
              <div>
                <button
                  @click="setReceipt(transaction)"
                  class="text-white bg-green-500 rounded text-center cursor-pointer hover:bg-green-600 duration-300 text-xs py-1 px-3">
                  Show
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 gray-border">
        <div class="flex justify-between items-center mb-6">
          <p class="sub-header">Invoice details</p>
          <div>
            <button class="blue-button px-3">Print Receipt</button>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <div class="text-xs">
              <p>Billing From:</p>
              <p class="text-base font-bold">Kinsley Supermarket</p>
              <p>Email: kingsley@gmail.com</p>
              <p>Address: 19 Rambo st. Ashiyie</p>
              <p>Phone: 0260521700</p>
            </div>
            <div class="text-xs">
              <p>Billing To:</p>
              <p class="text-base font-bold">xxxx xxxx xxx</p>
              <p>Email: xxx@xxx.com</p>
              <p>Address: xxxx xxx xxx</p>
              <p>Phone: xxx xxx xxxx</p>
            </div>
          </div>
          <div>
            <div class="grid grid-cols-4">
              <div class="gray-border">
                <p>
                  Invoice ID:
                  <br />
                  <span class="text-xs text-wrap">
                    {{ receipt?._id }}
                  </span>
                </p>
              </div>
              <div class="gray-border">
                <p>
                  Date Issued:
                  <br />
                  <span class="text-xs" v-if="receipt !== null">
                    {{ receiptDate }}
                  </span>
                </p>
              </div>
              <div class="gray-border">
                <p>
                  Invoice Type:
                  <br />
                  <span class="text-xs uppercase">
                    {{ receipt?.transactionType }}
                  </span>
                </p>
              </div>
              <div class="gray-border">
                <p>
                  Payment Method:
                  <br />
                  <span class="text-xs uppercase">
                    {{ receipt?.paymentMethod }}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <table class="w-full text-center">
              <thead>
                <tr class="border font-semibold">
                  <td class="text-left px-2">Name</td>
                  <td>Quantity</td>
                  <td>Price per unit</td>
                  <td>Amount</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(product, index) in receipt?.productDetails"
                  :key="index">
                  <td class="text-left px-2 big-box">{{ product.name }}</td>
                  <td>{{ product.quantity }}</td>
                  <td>{{ product.name }}</td>
                  <td>nai</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div class="flex justify-end">
              <div>
                <div class="grid grid-cols-3 py-1">
                  <div class="col-span-2">Subtotal</div>
                  <div class="col-span-1">GHC {{ receipt?.subTotal }}</div>
                </div>
                <div class="grid grid-cols-3 py-1">
                  <div class="col-span-2">Discount</div>
                  <div class="col-span-1">GHC {{ receipt?.discount }}</div>
                </div>
                <div class="grid grid-cols-3 pt-1 pb-3 border-b-2">
                  <div class="col-span-2">VAT</div>
                  <div class="col-span-1">GHC {{ receipt?.VAT }}</div>
                </div>
                <div class="grid grid-cols-3 py-3">
                  <div class="col-span-2">Total</div>
                  <div class="col-span-1 text-green-500">
                    GHC {{ receipt?.totalPrice }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTransactionStore } from "@/stores/transaction";
import { computed, onBeforeMount, ref } from "vue";

const transactionStore = useTransactionStore();
const transactions = ref(null);
const receipt = ref(null);

const setReceipt = (data) => {
  receipt.value = data;
};

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

const receiptDate = computed(() => {
  return formatDate(receipt.value?.transactionDate);
});

onBeforeMount(() => {
  transactionStore
    .getTransactions()
    .then((data) => {
      transactions.value = data;
      console.log("receipts:", transactions.value);
      receipt.value = data[0];
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style scoped>
.big-box {
  @apply py-4;
}
</style>
