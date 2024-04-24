import { defineStore } from "pinia";
const initialState = {
  products: null,
  selectedProductForEdit: null,
};
const token = localStorage.getItem("token");

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
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
        if (res.ok) {
          const data = await res.json();
          this.products = data;
          console.log(data);
          return data;
        } else {
          throw new Error("Could not fetch data");
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async getProduct(id) {
      try {
        const res = await fetch(`https://localhost:8080/api/products/${id}`, {
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
          //this.products.push(data);
          return data;
        } else {
          throw new Error("Could not add data");
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async addProduct(data) {
      try {
        const response = await fetch("http://localhost:8080/api/products", {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to create product");
        }

        const responseData = await response.json();
        console.log("response: ", responseData);
        this.getProducts();
        return responseData;
      } catch (error) {
        console.error("Error:", error.message);
        throw new Error(error.message);
      }
    },
    async addBatch(id, data) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}/add-batch`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to add batch");
        }

        const responseData = await response.json();
        console.log("response: ", responseData);
        //this.products?.push(responseData);

        this.products.filter((product) => {
          if (product._id == responseData._id) {
            product = responseData;
          }
        });
        return responseData;
      } catch (error) {
        console.error("Error:", error.message);
        throw new Error(error.message);
      }
    },
    async deleteProduct(id) {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`, {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);

          const newProductsArray = this.products.filter((product) => {
            return product._id !== data._id;
          });

          this.products = newProductsArray;
          return data;
        } else {
          throw new Error("Could not delete data");
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async updateProduct(id, data) {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`, {
          method: "PATCH",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        console.log(data);

        if (res.ok) {
          const data = await res.json();
          console.log(data);

          this.products.filter((product) => {
            if (product._id == data._id) {
              product = data;
              console.log("data found and updated");
            }
          });

          return data;
        } else {
          throw new Error("Failed to update product");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
  },
  persist: true,
});
