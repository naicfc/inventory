import { defineStore } from "pinia";
const initialState = {
  cart: [],
};

export const useCartStore = defineStore("cartStore", {
  state: () => ({ ...initialState }),
  actions: {
    async resetState() {
      Object.assign(this, initialState);
      this.cart = [];
      return "Cart has been cleared";
    },
    removeItem(id) {
      const newCart = this.cart.filter((item) => {
        console.log(item);
        return item.productId !== id;
      });

      this.cart = newCart;
    },
  },
  persist: true,
});
