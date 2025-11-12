<template>
  <ElTooltip
    trigger="click"
    placement="bottom-start"
    effect="light"
    :show-arrow="false"
    :offset="6"
    :hide-after="0"
    popper-class="menu"
    v-model:visible="visible"
    v-bind="$attrs"
  >
    <template #content>
      <BaseMenu :data="data" :width="width" />
    </template>

    <slot></slot>
  </ElTooltip>
</template>

<script setup lang="ts">
import { BaseMenu, MenuGrounp } from "./BaseMenu/index";

import { ElTooltip } from "element-plus";

withDefaults(
  defineProps<{
    data: MenuGrounp[];
    width?: number;
  }>(),
  {
    width: 250,
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

  box-shadow: rgba(0, 0, 0, 0.2) 0px 14px 28px -6px,
    rgba(0, 0, 0, 0.12) 0px 2px 4px -1px,
    rgba(255, 255, 255, 0.094) 0px 0px 0px 1px;
}
</style>
