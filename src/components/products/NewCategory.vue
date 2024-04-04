<template>
  <div
    class="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-[99] p-4 bg-black/70">
    <div class="w-full sm:max-w-[400px]">
      <form
        action=""
        @submit.prevent
        @submit="handleSubmit"
        class="border-2 rounded border-gray-300 p-4 flex flex-col gap-4 box-border bg-[--background-color]">
        <div class="flex justify-between">
          <span class="font-semibold blue">Add New Category</span>
          <img
            src="../../assets/icons/circle-xmark-regular.svg"
            width="20"
            alt=""
            class="cursor-pointer"
            @click="closeModal" />
        </div>

        <div>
          <label for="student" class="block">Category Name</label>
          <input
            type="text"
            class="p-3 w-full rounded border-2 border-gray-300 bg-transparent"
            required />
        </div>
        <div>
          <label for="class" class="block">Category</label>
          <input
            placeholder="Class Score"
            id="class"
            type="number"
            class="p-3 w-full rounded border-2 border-gray-300 bg-transparent"
            required />
        </div>
        <div>
          <label for="exam" class="block">Description</label>
          <input
            placeholder="Exam Score"
            id="exam"
            type="number"
            class="p-3 w-full rounded border-2 border-gray-300 bg-transparent"
            required />
        </div>
        <button class="blue-button p-3" type="submit">
          <div class="flex gap-2 items-center justify-center">
            <fwb-spinner color="gray" size="4" v-if="loading" />
            <p>Add Cateory</p>
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { FwbSpinner } from "flowbite-vue";

const { notify } = useNotification();
const disabled = ref(false);
const loading = ref(false);
const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};

const handleSubmit = async () => {
  disabled.value = true;
  loading.value = true;

  try {
    const data = {};
  } catch (error) {
    console.error("Error:", error);
    disabled.value = false;
    notify({
      type: "error",
      title: "Something Went wrong",
      text: error,
    });
  }
};

onBeforeMount(() => {});
</script>
