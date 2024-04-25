<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="header">Add New User</h1>
      </div>
    </div>

    <div class="flex">
      <form class="gray-border w-[25rem]" @submit.prevent="handleSubmit">
        <div>
          <div class="py-1">
            <label class="blue text-xs md:text-sm" for="name">Full Name:</label>
            <input
              type="text"
              id="name"
              v-model="fullname"
              class="form-input" />
          </div>
          <div class="py-1">
            <label class="blue text-xs md:text-sm" for="email">Username:</label>
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
          <div class="py-1">
            <label class="blue text-xs md:text-sm" for="role">Role:</label>
            <select class="form-input" id="role" v-model="role">
              <option value="" selected disabled>Select Role</option>
              <option value="salesman">salesman</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div class="error" v-if="error">{{ error }}</div>
          <div class="pt-5">
            <button
              class="p-2 blue-button w-full flex gap-2 justify-center items-center"
              :disabled="loading">
              <div>
                <fwb-spinner color="white" size="4" v-if="loading" />
              </div>
              <p class="font-semibold uppercase">Add user</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FwbSpinner } from "flowbite-vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { notify } = useNotification();
const fullname = ref("");
const username = ref("");
const role = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);

const handleSubmit = () => {
  loading.value = true;
  const data = {
    username: username.value,
    password: password.value,
    role: role.value,
    fullname: fullname.value,
  };
  console.log(data);

  if (authStore.user.role == "salesman") {
    notify({
      type: "error",
      title: "Unauthorized",
      text: "Only an admin can add another user",
    });

    loading.value = false;
    return true;
  }

  authStore
    .registerUser(data)
    .then((res) => {
      console.log(res);
      notify({
        type: "success",
        title: "Success",
        text: `User registered successfully`,
      });
      loading.value = false;
      fullname.value = "";
      username.value = "";
      password.value = "";
      role.value = "";
    })
    .catch((error) => {
      notify({
        type: "error",
        title: "Something Went wrong",
        text: error.message,
      });
      loading.value = false;
    });
};
</script>
