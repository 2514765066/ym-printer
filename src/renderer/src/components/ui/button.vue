<template>
  <button
    type="button"
    class="h-8 flex-center gap-2 rounded text-sm"
    :class="`
    ${type} 
    ${square ? 'aspect-square' : 'px-4'} 
    `"
    :disabled="disabled || loading"
    @click="emits('click')"
  >
    <icon icon="loading" width="16" class="rotate" v-if="loading" />

    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

withDefaults(
  defineProps<{
    type?: "primary" | "default";
    square?: boolean;
    bg?: string;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: "default",
    bg: "#303030",
  }
);

const emits = defineEmits<{
  click: [];
}>();
</script>

<style scoped lang="scss">
button {
  transition: background-color 0.1s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.primary {
  color: #fff;
  background-color: var(--primary-color);

  &:hover {
    background-color: var(--primary-dark-color);
  }
}

.default {
  color: var(--main-color);
  background-color: v-bind("bg");
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
    0 0.5px 0 0 rgba(255, 255, 255, 0.1) inset;

  &:hover {
    background-color: #383838;
  }
}
</style>
