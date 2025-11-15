import { IconName } from "@/components/icon/index.vue";
import type { Ref } from "vue";

export type MenuGrounp = {
  title?: string;
  hidden?: boolean;
  children: MenuItem[];
};

export type MenuItem = {
  title?: string;
  value?: string | number | symbol;
  icon?: IconName;
  sub?: string;
  hidden?: boolean;
  hoverColor?: string;
  disable?: Ref<boolean> | boolean;
  onSelect?: (data: MenuItem) => void;
};
