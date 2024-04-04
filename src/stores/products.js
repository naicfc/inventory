import { defineStore } from "pinia";
const initialState = {
  products: null,
};

export const useProductStore = defineStore("productStore", {
  state: () => ({ ...initialState }),
  actions: {
    resetState() {
      Object.assign(this, initialState);
    },
    async getProducts() {
      try {
        const res = await fetch(`http://localhost:8080/api/products`, {
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
          return data;
        } else {
          throw new Error(res);
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async getProduct(id) {
      try {
        const res = await fetch(`https://`, {
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
          return data;
        } else {
          throw new Error(res);
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async addProduct(data) {
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
        return data;
      } else {
        throw new Error(res);
      }
    },
    async deleteProduct(id) {
      try {
        const res = await fetch(`https://`, {
          method: "DELETE",
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

          const newProductsArray = this.products.filter((product) => {
            return product._id !== data._id;
          });
          this.products = newProductsArray;
          return data;
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async updateProduct(data) {
      async function postData(url = "", data = {}) {
        try {
          const response = await fetch(url, {
            method: "PATCH",
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

        this.products.filter((product) => {
          if (product._id == data._id) {
            product = data;
          }
        });

        return data;
      } else {
        throw new Error(res);
      }
    },
  },
  persist: true,
});
