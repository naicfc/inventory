<template>
  <div class="py-3 px-12 sticky top-0 bg-[#fdf9f9] shadow z-[1]">
    <div class="flex justify-between items-center">
      <div class="">
        <p class="text-lg font-bold text-[--primary-blue]">
          Hello, {{ firstName }}
        </p>
        <p class="text-xs text-gray-400">{{ formattedDate }}</p>
      </div>
      <div class="flex items-center gap-4">
        <RouterLink to="/cart">
          <div class="flex">
            <div
              class="bg-gray-500/30 p-2 rounded-full flex justify-center items-center">
              <img src="../../assets/icons/cart.svg" width="15" alt="" />
            </div>
            <div v-if="cartStore.cart?.length > 0">
              <div
                class="w-3 h-3 bg-green-400 rounded-full text-[8px] text-white text-center">
                {{ cartStore.cart?.length }}
              </div>
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/notifications">
          <div class="flex">
            <div
              class="bg-gray-500/30 p-2 rounded-full flex justify-center items-center">
              <img
                src="../../assets/icons/notificationbluegrad.png"
                width="16"
                alt="" />
            </div>
            <div v-if="activityStore.notifications?.length > 0">
              <div
                class="w-3 h-3 bg-blue-400 rounded-full text-[8px] text-white text-center">
                {{ activityStore.notifications?.length }}
              </div>
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/products/expiring">
          <div class="flex">
            <div
              class="bg-gray-500/30 p-2 rounded-full flex justify-center items-center">
              <img src="../../assets/icons/clock.svg" width="15" alt="" />
            </div>
            <div v-if="expired > 0 || expiring > 0">
              <div
                class="w-3 h-3 bg-red-400 rounded-full text-[8px] text-white text-center">
                {{ expiring + expired }}
              </div>
            </div>
          </div>
        </RouterLink>

        <div class="flex ml-4 gap-2 items-center">
          <div>
            <p class="text-xs font-semibold capitalize leading-none">
              {{ user?.fullname }}
            </p>
            <p class="text-xs text-right text-gray-400 capitalize">
              {{ user?.role }}
            </p>
          </div>
          <div>
            <fwb-dropdown placement="left">
              <template #trigger>
                <img
                  src="../../assets/icons/user(7).png"
                  width="35"
                  alt=""
                  class="cursor-pointer" />
              </template>
              <fwb-list-group class="rounded-none">
                <fwb-list-group-item class="hover:bg-slate-100 cursor-pointer">
                  <RouterLink to="/adduser">Add User</RouterLink>
                </fwb-list-group-item>
                <fwb-list-group-item
                  class="hover:bg-slate-100 cursor-pointer"
                  @click="logout">
                  Logout
                </fwb-list-group-item>
              </fwb-list-group>
            </fwb-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useActivityStore } from "@/stores/activities";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/products";
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from "flowbite-vue";
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const authStore = useAuthStore();
const activityStore = useActivityStore();
const productStore = useProductStore();
const { expiringBatches, expiredBatches } = storeToRefs(productStore);
const user = authStore.user;
const currentDate = new Date();

const expired = computed(() => {
  return expiredBatches.value?.length;
});

const expiring = computed(() => {
  return expiringBatches.value?.length;
});

const computeExpiry = computed(() => {
  if (expired.value.length > 0 && expiring.value.length > 0) {
    return expired.value.length + expiring.value.length;
  }
});

const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
  currentDate,
);

let full_name = user?.fullname;
let name_parts = full_name.split(" ");
let firstName = name_parts[0];

const logout = () => {
  if (window.confirm("Do you want to Logout?")) {
    authStore.logout();
  }
};

const createNotification = () => {
  if (expiringBatches.value?.length > 0) {
    activityStore.notifications.push({
      title: "Expiration",
      text: `${expiringBatches.value?.length} products are expired`,
    });
  }
  if (expiringBatches.value?.length > 0) {
    activityStore.notifications.push({
      title: "Expiration",
      text: `${expiredBatches.value?.length} products are expiring`,
    });
  }
};
onMounted(() => {
  createNotification();
});
</script>
