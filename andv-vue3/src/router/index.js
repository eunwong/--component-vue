import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/table",
    name: "table",
    component: () => import("../views/test/form.vue"),
  },
  {
    path: "/autoTool",
    name: "autoTool",
    component: () => import("../views/QAutoTool/index.vue"),
  },
  {
    path: "/",
    name: "index",
    component: () => import("../views/qTable/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
