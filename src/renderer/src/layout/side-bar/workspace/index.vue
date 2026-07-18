<template>
  <section class="min-h-0 flex-1 flex flex-col gap-2">
    <WorkspaceHeader />

    <WorkspaceContent />
  </section>
</template>

<script setup lang="ts">
import WorkspaceHeader from './workspace-header.vue';
import WorkspaceContent from './workspace-content/index.vue';
</script>

<style scoped lang="scss"></style>
