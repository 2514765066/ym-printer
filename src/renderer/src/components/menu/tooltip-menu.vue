<template>
  <ElTooltip
    trigger="click"
    :placement="placement"
    effect="light"
    :show-arrow="false"
    :hide-after="0"
    popper-class="menu"
    v-model:visible="visible"
  >
    <template #content>
      <BaseMenu :width="width" :data="data" v-model="visible" />
    </template>

    <slot></slot>
  </ElTooltip>
</template>

<script setup lang="ts">
import BaseMenu from "./index.vue";
import { ElTooltip } from "element-plus";

import { MenuGroup } from "./index";

withDefaults(
  defineProps<{
    data: MenuGroup[];
    width?: number;
    placement?: string;
  }>(),
  {
    placement: "bottom-start",
  }
);

const visible = defineModel({
  default: false,
});
</script>

<style lang="scss">
.menu {
  --el-popper-border-radius: 8px !important;
  --el-bg-color-overlay: transparent !important;

  padding: unset !important;
  border: unset !important;
  overflow: unset !important;
}
</style>
