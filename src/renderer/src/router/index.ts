import { createRouter, createWebHashHistory } from "vue-router";
import Doc from "@/views/doc/index.vue";
import Layout from "@/layout/index.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "",
      redirect: "/onboarding",
    },
    {
      path: "/onboarding",
      component: () => import("@/onboarding/index.vue"),
    },
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          redirect: "/doc",
        },
        {
          path: "doc",
          component: Doc,
        },
        {
          path: "print-task",
          component: () => import("@/views/print-task/index.vue"),
        },
      ],
    },
  ],
});

export default router;
