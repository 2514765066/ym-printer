import { RouteRecordRaw } from "vue-router";
import Root from "@manager/root.vue";
import Home from "@manager/views/home/index.vue";
import Setting from "@manager/views/setting/index.vue";
import PrintQueue from "@manager/views/print-queue/index.vue";

const route: RouteRecordRaw = {
  path: "/manager",
  component: Root,
  children: [
    {
      path: "",
      redirect: "/manager/home",
    },
    {
      path: "home",
      component: Home,
    },
    {
      path: "print-queue",
      component: PrintQueue,
    },
    {
      path: "settings",
      component: Setting,
    },
  ],
};

export default route;
