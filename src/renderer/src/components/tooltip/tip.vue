<template>
  <ElTooltip :content="label" :placement="placement" :hide-after="0">
    <slot></slot>
  </ElTooltip>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";

defineProps<{
  label: string;
  placement?: "right" | "left" | "top" | "bottom";
}>();
</script>

<style scoped lang="scss"></style>
