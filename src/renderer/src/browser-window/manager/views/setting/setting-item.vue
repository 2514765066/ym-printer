<template>
  <section class="h-16 p-2 flex items-center gap-2 rounded-md">
    <div class="w-10 flex-center aspect-square">
      <Icon :icon="icon" size="26" color="rgba(255,255,255,0.6)" />
    </div>

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

<style scoped lang="scss">
section {
  background-color: var(--list-bg-color);
}
</style>
