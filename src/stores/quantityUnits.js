import { defineStore } from "pinia";
const initialState = {
  units: null,
};

export const useQuantityUnitStore = defineStore("quantityUnitStore", {
  state: () => ({ ...initialState }),
  actions: {
    resetState() {
      Object.assign(this, initialState);
    },
    async getQuantityUnits() {
      try {
        const res = await fetch(`http://localhost:8080/api/quantityunits`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          this.units = data;
          return data;
        } else {
          throw new Error("Failed to fetch units");
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async addQuantityUnits(data) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/quantityunits",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to create category");
        }

        const responseData = await response.json();
        console.log("response: ", responseData);
        this.units.push(responseData);
        return responseData;
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
  },
  persist: true,
});
