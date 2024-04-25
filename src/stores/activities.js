import { defineStore } from "pinia";
const initialState = {
  activities: [],
  notifications: [],
};
const token = localStorage.getItem("token");

export const useActivityStore = defineStore("activityStore", {
  state: () => ({ ...initialState }),
  actions: {
    resetState() {
      Object.assign(this, initialState);
    },
    async getActivities() {
      try {
        const res = await fetch(`http://localhost:8080/api/activities`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          this.activities = data;
          return data;
        } else {
          throw new Error("Failed to fetch units");
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
});
