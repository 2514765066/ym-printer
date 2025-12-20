<template>
  <ElTooltip
    :trigger="trigger"
    :placement="placement"
    effect="light"
    :show-arrow="false"
    :hide-after="100"
    popper-class="menu"
    :disabled="disabled"
    v-model:visible="visible"
  >
    <template #content>
      <Menu v-bind="$props" @close="handleClose" />
    </template>

    <slot></slot>
  </ElTooltip>
</template>

<script setup lang="ts">
import { Menu } from "../index";
import { ElTooltip } from "element-plus";
import { MenuProps } from "../type";

withDefaults(
  defineProps<
    MenuProps & {
      placement?: string;
      trigger?: "click" | "hover";
      disabled?: boolean;
    }
  >(),
  {
    placement: "bottom-start",
    trigger: "click",
  }
);

const visible = ref(false);

const handleClose = () => {
  visible.value = false;
};
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
