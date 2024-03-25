<template>
  <div class="py-3 px-12 sticky top-0 bg-[--background-color] shadow">
    <div class="flex justify-between items-center">
      <div class="">
        <p class="text-xl font-semibold">Welcome, <span class="text-gray-800 text-2xl font-bold">User</span></p>
      </div>
      <div class="flex items-center gap-4">
        <RouterLink to="/login"><p class="text-red-600">Notifications</p></RouterLink>
        <RouterLink to="/login"><p class="text-red-600">Logout</p></RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
