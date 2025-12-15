<template>
  <ElTooltip
    :hide-after="0"
    :show-arrow="false"
    :content="label"
    :placement="placement"
    effect="light"
    :offset="6"
    :append-to="appendTo"
  >
    <slot></slot>

    <template #content>
      <slot name="content">
        <div class="max-w-80 flex flex-col">
          <span class="text-white" v-if="label">{{ label }}</span>
          <span class="text-sub text-xs break-all" v-if="sub">{{ sub }}</span>
        </div>
      </slot>
    </template>
  </ElTooltip>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";

defineProps<{
  label?: string;
  sub?: string;
  placement?: "right" | "left" | "top" | "bottom";
  appendTo?: string | HTMLElement;
}>();
</script>

<style lang="scss"></style>
