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
    removeItem(id) {
      const newCart = this.cart.filter((item) => {
        return item.id !== id;
      });
      console.log(id);

      this.cart = newCart;
    },
  },
  persist: true,
});
