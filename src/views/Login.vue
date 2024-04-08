<template>
  <div class="h-screen p-2">
    <div class="flex items-center justify-center h-screen md:h-[90%]">
      <div>
        <form
          class="max-w-[400px] text-sm md:text-base p-4 md:p-8 gray-border"
          @submit="handleSubmit"
          @submit.prevent>
          <div class="">
            <div class="flex justify-center items-center">
              <img src="../assets/icons/lock-solid.svg" width="13" />
              <div><p class="text-lg p-2 text-center font-extrabold blue">User Login</p></div>
            </div>
            <p class="text-sm pb-3">
              Login with the username and password provided by your admin.
            </p>
          </div>
          <div>
            <div class="py-1">
              <label class="blue text-xs md:text-sm" for="email">
                Username:
              </label>
              <input
                type="text"
                id="email"
                v-model="email"
                class="form-input" />
            </div>
            <div class="py-1">
              <label class="blue text-xs md:text-sm" for="password">
                Password:
              </label>
              <input
                type="password"
                id="password"
                v-model="password"
                class="form-input" />
            </div>
            <div class="error" v-if="error">{{ error }}</div>
            <div class="pt-5">
              <button
                class="p-2 blue-button w-full flex gap-2 justify-center items-center">
                <div>
                  <fwb-spinner color="white" size="4" v-if="loading" />
                </div>
                <p class="font-semibold uppercase">Sign In</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { FwbSpinner } from "flowbite-vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const { notify } = useNotification();
const handleSubmit = async () => {
  loading.value = true;
  const user = {
    email: email.value,
    password: password.value,
  };
  console.log(user);
  setTimeout(() => {
    loading.value = false;
    router.push("/dashboard");
  }, 3000);
};
</script>
