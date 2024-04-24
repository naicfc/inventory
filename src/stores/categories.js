import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
const initialState = {
  categories: null,
};
const token = localStorage.getItem("token");

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({ ...initialState }),
  actions: {
    resetState() {
      Object.assign(this, initialState);
    },
    async getCategories() {
      try {
        const res = await fetch(`http://localhost:8080/api/categories`, {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          this.categories = data;
          return data;
        } else {
          throw new Error(res);
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async addCategory(data) {
      try {
        const response = await fetch("http://localhost:8080/api/categories", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to create category");
        }

        const responseData = await response.json();
        console.log("response: ", responseData);
        this.categories.push(responseData);
        return responseData;
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
  },
  persist: true,
});
