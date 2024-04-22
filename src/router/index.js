import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Dashboard.vue"),
      children: [
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
          children: [
            {
              path: "/products/allproducts",
              name: "allproducts",
              component: () => import("../views/Products.vue"),
            },
            {
              path: "/products/expiring",
              name: "expiringproducts",
              component: () => import("../views/ExpiringProducts.vue"),
            },
            {
              path: "/products/add-product",
              name: "addproduct",
              component: () => import("../components/products/AddProduct.vue"),
            },
            {
              path: "/products/edit",
              name: "editproduct",
              component: () => import("../components/products/EditProduct.vue"),
            },
          ],
        },
        {
          path: "/cart",
          name: "cart",
          component: () => import("../views/Cart.vue"),
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

export default router;
