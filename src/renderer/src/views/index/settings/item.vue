<template>
  <section class="p-2 flex items-center gap-2 rounded-md">
    <Icon :icon="icon" size="28" color="rgba(255,255,255,0.6)" />

    <div class="mr-auto flex flex-col">
      <span class="text-main text-sm">{{ label }}</span>
      <span class="text-sub text-xs">{{ sub }}</span>
    </div>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import Icon, { IconName } from "@/components/icon/index.vue";

defineProps<{
  label: string;
  sub: string;
  icon: IconName;
}>();
</script>

<style scoped lang="scss"></style>
