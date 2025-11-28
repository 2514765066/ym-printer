import { createRouter, createWebHashHistory } from "vue-router";
import ManagerRoute from "@manager/router";
import PrintRoute from "@print/router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [ManagerRoute, PrintRoute],
});

export default router;
