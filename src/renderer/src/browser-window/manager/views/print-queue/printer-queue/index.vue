<template>
  <section class="printer-queue flex flex-col">
    <QueueHeader />

    <QueueContent />
  </section>
</template>

<script setup lang="ts">
import QueueHeader from "./queue-header.vue";
import QueueContent from "./queue-content/index.vue";
</script>

<style scoped lang="scss">
.printer-queue {
  grid-area: queue;
}
</style>
