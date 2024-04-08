import { defineStore } from "pinia";
const initialState = {
  user: null,
};

export const useAuthStore = defineStore("authStore", {
  state: () => ({ ...initialState }),
  actions: {
    resetState() {
      Object.assign(this, initialState);
    },
  },
  persist: true,
});
