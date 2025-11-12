<template>
  <Icon :icon="iconPacks[icon]" :width="size" :height="size" :color="color" />
</template>

<script setup lang="ts">
import print from "@iconify/icons-fluent/print-20-regular";
import loading from "@iconify/icons-fluent/spinner-ios-20-filled";
import add from "@iconify/icons-fluent/add-20-filled";
import subtract from "@iconify/icons-fluent/subtract-20-filled";
import sun from "@iconify/icons-fluent/weather-moon-off-20-regular";
import moon from "@iconify/icons-fluent/weather-moon-20-regular";
import settings from "@iconify/icons-fluent/settings-20-regular";
import queue from "@iconify/icons-fluent/document-queue-20-regular";
import home from "@iconify/icons-fluent/home-20-regular";
import file from "@iconify/icons-fluent/document-multiple-20-regular";
import remove from "@iconify/icons-fluent/delete-20-regular";
import play from "@iconify/icons-fluent/play-20-regular";
import price from "@iconify/icons-fluent/currency-dollar-euro-20-regular";
import theme from "@iconify/icons-fluent/dark-theme-20-regular";
import info from "@iconify/icons-fluent/error-circle-20-regular";
import mark from "@iconify/icons-fluent/bookmark-20-regular";
import { Icon } from "@iconify/vue";

export type IconName = keyof typeof iconPacks;

withDefaults(
  defineProps<{
    size: number | string;
    icon: IconName;
    color?: string;
  }>(),
  {
    color: "rgba(255,255,255,0.8)",
  }
);

const iconPacks = {
  loading,
  print,
  add,
  subtract,
  sun,
  moon,
  settings,
  queue,
  home,
  file,
  remove,
  play,
  price,
  theme,
  info,
  mark,
};
</script>

<style scoped lang="scss"></style>
