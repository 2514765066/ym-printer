<template>
  <section class="wh-full flex-center flex-col">
    <Icon :icon="icon" width="150" color="rgba(255,255,255,0.1)" />

    <span class="text-xl font-bold">{{ label }}</span>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  label: string;
  icon: string;
}>();
</script>

<style scoped lang="scss">
section {
  > span {
    color: rgba(#fff, 0.1);
  }
}
</style>
