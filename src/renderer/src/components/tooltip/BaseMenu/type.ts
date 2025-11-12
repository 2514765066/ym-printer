import { IconName } from "@/components/icon/index.vue";

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
  disable?: boolean;
  onSelect?: (data: MenuItem) => void;
};
