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
          <label for="name" class="block">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Category Name"
            class="p-3 w-full rounded border-2 border-gray-300 bg-transparent"
            required
            v-model="name" />
        </div>
        <div>
          <label for="description" class="block">Description</label>
          <input
            placeholder="Category Description"
            id="description"
            type="text"
            class="p-3 w-full rounded border-2 border-gray-300 bg-transparent"
            required
            v-model="description" />
        </div>
        <button class="blue-button p-3" type="submit">
          <div class="flex gap-2 items-center justify-center">
            <fwb-spinner color="gray" size="4" v-if="loading" />
            <p>Add Category</p>
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
import { useCategoryStore } from "@/stores/categories.js";

const categoryStore = useCategoryStore();
const { notify } = useNotification();
const disabled = ref(false);
const loading = ref(false);
const name = ref("");
const description = ref("");
const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};

const handleSubmit = async () => {
  disabled.value = true;
  loading.value = true;

  try {
    const data = {
      name: name.value,
      description: description.value,
    };
    categoryStore
      .addCategory(data)
      .then((res) => {
        setTimeout(() => {
          disabled.value = false;
          loading.value = false;
          closeModal();
          notify({
            type: "success",
            title: "Success",
            text: `${res.name} has been added successfully`,
          });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        notify({
          type: "error",
          title: "Something Went wrong",
          text: error.message,
        });
      });
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
