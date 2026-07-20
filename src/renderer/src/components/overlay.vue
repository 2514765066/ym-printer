<template>
  <section
    class="flex-center absolute inset-0 pointer-events-none z-9999 bg-muted/90 border-dotted"
  >
    <div class="px-2 py-1 rounded-md bg-primary">
      <span class="text-sm">{{ label }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<style scoped lang="scss"></style>
