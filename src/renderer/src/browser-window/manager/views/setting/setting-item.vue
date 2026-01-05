<template>
  <section
    class="h-16 px-2 pr-3 flex items-center gap-2 rounded-md bg-list border border-border"
  >
    <div class="w-10 flex-center aspect-square">
      <Icon :icon="icon" width="26" color="rgba(255,255,255,0.6)" />
    </div>

    <div class="mr-auto flex flex-col">
      <span class="text-main text-sm">{{ label }}</span>
      <span class="text-sub text-xs" v-if="sub">{{ sub }}</span>
    </div>

    <div class="flex items-center gap-2">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  label: string;
  sub?: string;
  icon: string;
}>();
</script>

<style scoped lang="scss"></style>
