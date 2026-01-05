<template>
  <section class="wh-full flex-center">
    <Icon icon="loading" class="rotate" :width="size" :color="color" />
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

withDefaults(
  defineProps<{
    size?: number | string;
    color?: string;
  }>(),
  {
    size: 32,
    color: "rgba(255,255,255,0.6)",
  }
);
</script>

<style scoped lang="scss"></style>
