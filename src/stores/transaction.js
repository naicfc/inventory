import { defineStore } from "pinia";
const initialState = {
  transactions: null,
};
const token = localStorage.getItem("token");

export const useTransactionStore = defineStore("transactionStore", {
  state: () => ({ ...initialState }),
  actions: {
    resetState() {
      Object.assign(this, initialState);
    },
    async getTransactions() {
      try {
        const res = await fetch(`http://localhost:8080/api/transactions`, {
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
          this.transactions = data;
          console.log("response: ", data);
          return data;
        } else {
          throw new Error("Could not fetch data");
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async getTransaction(id) {
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
          // this.products.push(data);
          return data;
        } else {
          throw new Error("Could not add data");
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async createTransaction(data) {
      try {
        const response = await fetch("http://localhost:8080/api/transactions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Transaction failed");
        }

        const responseData = await response.json();
        console.log("response: ", responseData);
        return responseData;
      } catch (error) {
        console.error("Error:", error.message);
        throw new Error(error.message);
      }
    },
  },
  persist: true,
});
