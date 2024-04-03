<script setup>
import { RouterView } from "vue-router";
import Topbar from "@/components/navigation/Topbar.vue";
import Sidebar from "@/components/navigation/Sidebar.vue";
import Navigator from "@/components/navigation/Navigator.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <div class="fixed z-[99] w-[13vw] md:w-[7vw] bg-[--primary-blue] h-screen">
      <Sidebar />
    </div>
    <div class="ml-[13vw] md:ml-[7vw] w-full min-h-full">
      <div>
        <div>
          <Topbar />
          <Navigator />
          <div class="padding">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
