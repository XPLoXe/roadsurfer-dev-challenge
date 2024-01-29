import { createRouter, createWebHistory } from "vue-router";
import CalendarView from "../components/CalendarView.vue";
import BookingDetail from "../components/BookingDetail.vue";

const routes = [
  { path: "/", component: CalendarView },
  { path: "/booking/:id", component: BookingDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
