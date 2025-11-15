import { createRouter, createWebHashHistory } from "vue-router";
import Settings from "@/views/settings/index.vue";
import Home from "@/views/home/index.vue";
import Print from "@/views/print/index.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/settings",
      component: Settings,
    },
    {
      path: "/print",
      component: Print,
    },
  ],
});

export default router;
