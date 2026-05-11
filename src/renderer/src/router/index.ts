import { createRouter, createWebHashHistory } from "vue-router";
import Doc from "@/views/doc/index.vue";
import PrintTask from "@/views/print-task/index.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "",
      redirect: "/doc",
    },
    {
      path: "/doc",
      component: Doc,
    },
    {
      path: "/print-task",
      component: PrintTask,
    },
  ],
});

export default router;
