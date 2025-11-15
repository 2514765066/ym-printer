<template>
  <section class="title-bar flex items-center p-2 gap-2">
    <ExtIcon :ext="data.ext" size="14" class="h-6" />

    <span class="text-main text-sm"> {{ data.label }}</span>
  </section>
</template>

<script setup lang="ts">
import ExtIcon from "@/components/icon/ext-icon.vue";

defineProps<{
  data: {
    label?: string;
    ext?: string;
  };
}>();
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 148px;

  border-bottom: 1px solid var(--border-color);

  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }
}
</style>
