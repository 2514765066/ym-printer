import { IconName } from "../icon/index.vue";
import Menu from "./tooltip-menu.vue";
import ContextMenu from "./context-menu.vue";
import type { Ref } from "vue";

export type MenuProps = {
  data: MenuGroup[];
  width?: number;
};

export type MenuGroup = {
  label?: string;
  hidden?: boolean;
  children: MenuItem[];
};

export type MenuItem = {
  label?: string;
  value?: string | number | symbol;
  icon?: IconName;
  sub?: string;
  hoverColor?: string;
  hidden?: (data?: any) => Ref<boolean> | boolean;
  disable?: (data?: any) => Ref<boolean> | boolean;
  onSelect?: (data?: any) => void;
};

export { Menu, ContextMenu };
