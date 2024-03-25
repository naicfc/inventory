import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Dashboard.vue"),
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("../views/Login.vue"),
        },
        {
          path: "/analytics",
          name: "analytics",
          component: () => import("../views/Analytics.vue"),
        },
        {
          path: "/transactions",
          name: "transactions",
          component: () => import("../views/Transactions.vue"),
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/Home.vue"),
        },
        {
          path: "/sell",
          name: "sell",
          component: () => import("../views/Sell.vue"),
        },
        {
          path: "/products",
          name: "products",
          component: () => import("../views/Products.vue"),
        },
      ],
    },
  ],
});

export default router;
