import router from "@/router";
import { defineStore } from "pinia";
const initialState = {
  user: null,
  isLoggedIn: false,
  users: null,
};

export const useAuthStore = defineStore("authStore", {
  state: () => ({ ...initialState }),
  actions: {
    resetState() {
      Object.assign(this, initialState);
    },
    async login(data) {
      try {
        const res = await fetch(`http://localhost:8080/api/user/login`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const userdata = await res.json();
          console.log(userdata);
          this.user = userdata;
          this.isLoggedIn = true;
          localStorage.setItem("token", userdata.token);
          return userdata;
        } else {
          throw new Error("Could not login");
        }
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    async registerUser(data) {
      try {
        const res = await fetch(`http://localhost:8080/api/user/signup`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const userdata = await res.json();
          console.log(userdata);
          return userdata;
        } else {
          const errorMessage = await res.json();
          throw new Error(errorMessage.error || "Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error(error.message);
      }
    },
    logout() {
      this.isLoggedIn = false;
      router.push("/");
    },
  },
  persist: true,
});
