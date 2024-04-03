<template>
  <div class="py-3 px-12 sticky top-0 bg-white shadow">
    <div class="flex justify-between items-center">
      <div class="">
        <p class="text-lg font-bold text-gray-700">Hello, Godfred</p>
        <p class="text-xs text-gray-400">{{ formattedDate }}</p>
      </div>
      <div class="flex items-center gap-4">
        <RouterLink to="/login">
          <div
            class="bg-gray-500/30 p-2 rounded-full flex justify-center items-center">
            <img
              src="../../assets/icons/notificationbluegrad.png"
              width="15"
              alt="" />
          </div>
        </RouterLink>
        <RouterLink to="/login">
          <div
            class="bg-gray-500/30 p-2 rounded-full flex justify-center items-center">
            <img
              src="../../assets/icons/messagebluegrad.png"
              width="15"
              alt="" />
          </div>
        </RouterLink>
        <RouterLink to="/login">
          <div
            class="bg-gray-500/30 p-2 rounded-full flex justify-center items-center">
            <img src="../../assets/icons/clock.svg" width="15" alt="" />
          </div>
        </RouterLink>

        <div class="flex ml-4 gap-2 items-center">
          <div>
            <p class="text-xs font-semibold capitalize leading-none">godfred nai</p>
            <p class="text-xs text-right text-gray-400">salesman</p>
          </div>
          <div>
            <img src="../../assets/icons/user(7).png" width="35" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentDate = new Date();

const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
  currentDate,
);
</script>
