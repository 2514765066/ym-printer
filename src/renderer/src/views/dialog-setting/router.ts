import {
  CircleAlertIcon,
  CircleArrowUpIcon,
  CircleDollarSignIcon,
  ClipboardIcon,
} from "lucide-vue-next";
import Price from "./view/price.vue";
import { Component } from "vue";
import Update from "./view/update.vue";
import About from "./view/about.vue";
import { appVersion } from "@/services/info.js";
import Preset from "./view/preset/index.vue";

export interface Route {
  id: string;
  name: string;
  description?: string;
  icon: Component;
  component: Component;
}

const router: Route[] = [
  {
    id: "preset",
    name: "打印范围预设",
    icon: ClipboardIcon,
    component: Preset,
  },
  {
    id: "price",
    name: "价格",
    icon: CircleDollarSignIcon,
    component: Price,
  },

  {
    id: "update",
    name: "更新",
    icon: CircleArrowUpIcon,
    component: Update,
  },
  {
    id: "about",
    name: "关于",
    description: `v${appVersion}`,
    icon: CircleAlertIcon,
    component: About,
  },
];

//当前选中的路由的id
export const selectedRouteID = ref(router[0].id);

//选中的路由
export const selectedRoute = computed(() => {
  return router.find(r => r.id == selectedRouteID.value);
});

export default router;
