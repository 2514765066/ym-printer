<template>
  <section class="group mb-6 flex flex-col">
    <header class="py-4 text-sub text-xs">{{ label }}</header>

    <div class="flex flex-col gap-1.5">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<style scoped lang="scss">
.group {
  width: 90%;
  max-width: 1150px;
}
</style>
