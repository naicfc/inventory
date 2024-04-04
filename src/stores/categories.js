import { defineStore } from "pinia";
const initialState = {
  categories: null,
};

export const useProductStore = defineStore("productStore", {
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
      async function postData(url = "", data = {}) {
        try {
          const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
          });
          return response.json();
        } catch (error) {
          console.log(error.message);
          throw new Error(error.message);
        }
      }

      const res = await postData(`https://`, data);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        this.categories.push(data);
        return data;
      } else {
        throw new Error(res);
      }
    },
  },
  persist: true,
});
