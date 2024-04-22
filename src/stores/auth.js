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
    async login(username, password) {
      try {
        const res = await fetch(`http://localhost:8080/users/login`, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          this.user = data;
          return data;
        } else {
          throw new Error(res);
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async registerUser(data) {},
    logout() {},
  },
  persist: true,
});
