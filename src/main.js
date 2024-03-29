import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import "./input.css";

createApp(App).use(router).use(VCalendar, {}).mount("#app");
