import { RouteRecordRaw } from "vue-router";
import Layout from "@manager/layout/index.vue";
import Home from "@manager/views/home/index.vue";
import Setting from "@manager/views/setting/index.vue";
import PrintQueue from "@manager/views/print-queue/index.vue";

const route: RouteRecordRaw = {
  path: "/manager",
  component: Layout,
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
