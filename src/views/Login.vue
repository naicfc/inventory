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
              <div>
                <p class="text-lg p-2 text-center font-extrabold blue">
                  User Login
                </p>
              </div>
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
                v-model="username"
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
                class="p-2 blue-button w-full flex gap-2 justify-center items-center"
                :disabled="loading">
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
const username = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const { notify } = useNotification();

const handleSubmit = async () => {
  loading.value = true;
  const data = {
    username: username.value,
    password: password.value,
  };
  console.log(data);

  setTimeout(() => {
    authStore
      .login(data)
      .then((res) => {
        notify({
          type: "success",
          title: "Success",
          text: `${res.username} logged in successfully`,
        });
        loading.value = false;
        router.push("/dashboard");
      })
      .catch((error) => {
        notify({
          type: "error",
          title: "Something Went wrong",
          text: error,
        });
      });
  }, 1000);
};
</script>
