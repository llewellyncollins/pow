import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import RelativeChangeCalculator from "../pages/RelativeChangeCalculator.vue";
import Login from "../pages/Login.vue";
import Logout from "../pages/Logout.vue";
import Create from "../pages/Create.vue";
import List from "../pages/List.vue";
import Home from "../pages/Home.vue";

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
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
