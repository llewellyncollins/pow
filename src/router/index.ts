import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import RelativeChangeCalculator from "../pages/RelativeChangeCalculator.vue";
import Login from "../pages/Login.vue";
import Logout from "../pages/Logout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/gynaecology-relative-change",
    name: "RelativeChangeCalculator",
    component: RelativeChangeCalculator,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
