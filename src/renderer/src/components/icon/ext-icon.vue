<template>
  <div class="flex-center rounded-md aspect-square">
    <span class="font-bold">{{ info.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { extMap } from "./index";

const { ext } = defineProps<{
  ext: string;
}>();

const info = extMap[ext] as {
  label: string;
  color: string;
  size: number;
};
</script>

<style scoped lang="scss">
div {
  background-color: v-bind("info.color");

  > span {
    font-size: calc(v-bind("info.size") * 1px);
  }
}
</style>
