<template>
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="header">Dashboard</h1>
    </div>
    <div class="grid grid-cols-5 gap-8">
      <div class="flex justify-between col-span-3 gap-4">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
      <div class="col-span-2">
        <div class="gray-border">
          <h1 class="sub-header">Recent Activities</h1>
        </div>
      </div>
    </div>

    <ul>
      <li>Transactions this week -- numbers</li>
      <li>Transactions last week -- number</li>
      <li>Out of stock items - number</li>
      <li>Expiring Items</li>
      <li>Sales Today -- money</li>
    </ul>
  </div>
</template>

<script setup>
import DashboardCard from "@/components/dashboard/DashboardCard.vue";
</script>
