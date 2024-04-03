<template>
  <div class="flex gap-2 items-center justify-between px-12 py-4">
    <div class="flex gap-2">
      <button
        class="px-2 border-2 border-gray-300 text-xl rounded"
        @click="back">
        &lt
      </button>
      <button
        class="px-2 border-2 border-gray-300 text-xl rounded"
        @click="foward">
        &gt
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    foward() {
      this.$router.go(1);
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
