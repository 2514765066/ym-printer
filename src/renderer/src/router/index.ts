import { createRouter, createWebHashHistory } from "vue-router";
import Settings from "@/views/index/settings/index.vue";
import Home from "@/views/index/home/index.vue";
import Print from "@/views/print/index.vue";
import Index from "@/views/index/index.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "",
      redirect: "/index/home",
    },
    {
      path: "/index",
      component: Index,
      children: [
        {
          path: "",
          redirect: "/index/home",
        },
        {
          path: "home",
          component: Home,
        },
        {
          path: "settings",
          component: Settings,
        },
      ],
    },
    {
      path: "/print",
      component: Print,
    },
  ],
});

export default router;
