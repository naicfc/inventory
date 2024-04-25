<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="header">Notifications</h1>
      </div>
    </div>
    <div
      class="h-[50vh] flex items-center justify-center"
      v-if="notifications?.length <= 0">
      <div>
        <p>No Notifications</p>
      </div>
    </div>
    <div v-for="notification in notifications" class="flex">
      <div class="gray-border flex flex-col gap-1">
        <div class="flex gap-2">
          <img src="../assets/icons/clock.svg" alt="" width="15" />
          {{ notification.title }}
        </div>
        <p>
          {{ notification.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useActivityStore } from "@/stores/activities";
import { onBeforeMount, ref } from "vue";

const notifications = ref(null);
const activityStore = useActivityStore();

onBeforeMount(() => {
  notifications.value = activityStore.notifications;
});
</script>
