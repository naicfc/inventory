import { defineStore } from "pinia";
const initialState = {
  cart: [],
};

export const useCartStore = defineStore("cartStore", {
  state: () => ({ ...initialState }),
  actions: {
    resetState() {
      Object.assign(this, initialState);
    },
  },
  persist: true,
});
