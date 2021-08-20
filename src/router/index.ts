import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import RelativeChangeCalculator from "../pages/RelativeChangeCalculator.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/gynaecology-relative-change",
    name: "RelativeChangeCalculator",
    component: RelativeChangeCalculator,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
