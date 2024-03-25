<template>
  <div class="py-4 w-full">
    <div>
      <p class="text-center text-white font-bold text-2xl mb-6">Logo</p>
    </div>
    <nav class="grid grid-cols-1 gap-4 text-white">
      <RouterLink to="/dashboard">
        <div
          class="flex flex-col gap-2 w-full justify-center items-center hover:bg-[--secondary-blue] py-2">
          <div class="p-2 w-10 h-10 rounded bg-zinc-100"></div>
          <span class="text-sm leading-none">Dashboard</span>
        </div>
      </RouterLink>

      <RouterLink to="/products">
        <div
          class="flex flex-col gap-2 w-full justify-center items-center hover:bg-[--secondary-blue] py-2">
          <div class="p-2 w-10 h-10 rounded bg-zinc-100"></div>
          <p class="text-sm leading-none">Products</p>
        </div>
      </RouterLink>

      <RouterLink to="/sell">
        <div
          class="flex flex-col gap-2 w-full justify-center items-center hover:bg-[--secondary-blue] py-2">
          <div class="p-2 w-10 h-10 rounded bg-zinc-100"></div>
          <p class="text-sm leading-none">Sell</p>
        </div>
      </RouterLink>

      <RouterLink to="/transactions">
        <div
          class="flex flex-col gap-2 w-full justify-center items-center hover:bg-[--secondary-blue] py-2">
          <div class="p-2 w-10 h-10 rounded bg-zinc-100"></div>
          <p class="text-sm leading-none">Transactions</p>
        </div>
      </RouterLink>

      <RouterLink to="/analytics">
        <div
          class="flex flex-col gap-2 w-full justify-center items-center hover:bg-[--secondary-blue] py-2">
          <div class="p-2 w-10 h-10 rounded bg-zinc-100"></div>
          <p class="text-sm leading-none">Analytics</p>
        </div>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
