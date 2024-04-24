import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Dashboard.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "/analytics",
          name: "analytics",
          component: () => import("../views/Analytics.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/transactions",
          name: "transactions",
          component: () => import("../views/Transactions.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/adduser",
          name: "adduser",
          component: () => import("../views/AddUser.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/Home.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/sell",
          name: "sell",
          component: () => import("../views/Sell.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/products",
          name: "products",
          children: [
            {
              path: "/products/allproducts",
              name: "allproducts",
              component: () => import("../views/Products.vue"),
              meta: { requiresAuth: true },
            },
            {
              path: "/products/expiring",
              name: "expiringproducts",
              component: () => import("../views/ExpiringProducts.vue"),
              meta: { requiresAuth: true },
            },
            {
              path: "/products/add-product",
              name: "addproduct",
              component: () => import("../components/products/AddProduct.vue"),
              meta: { requiresAuth: true },
            },
            {
              path: "/products/edit",
              name: "editproduct",
              component: () => import("../components/products/EditProduct.vue"),
              meta: { requiresAuth: true },
            },
          ],
        },
        {
          path: "/cart",
          name: "cart",
          component: () => import("../views/Cart.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) return "/";
});

export default router;
