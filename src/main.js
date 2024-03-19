import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import velocity from "velocity-animate";
import Notifications from "@kyvg/vue3-notification";

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.use(Notifications, { velocity });
app.mount("#app");
