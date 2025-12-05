import { IconName } from "../icon/index.vue";
import Menu from "./tooltip-menu.vue";
import ContextMenu from "./context-menu.vue";

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
  hidden?: ((data?: any) => boolean) | boolean;
  disable?: ((data?: any) => boolean) | boolean;
  onSelect?: (data?: any) => void;
};

export { Menu, ContextMenu };
