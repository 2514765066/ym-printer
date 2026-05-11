<template>
  <Container
    class="relative"
    :is-empty="printerTasks.length == 0"
    empty-width-header
  >
    <template #header>
      <QueueHeader />
    </template>

    <template #empty>
      <QueueEmpty />
    </template>

    <QueueContent />
  </Container>
</template>

<script setup lang="ts">
import Container from "@/components/container/index.vue";
import QueueHeader from "./queue-header/index.vue";
import QueueContent from "./queue-content/index.vue";
import QueueEmpty from "./queue-empty.vue";
import { usePrinterTaskStore } from "@/stores/usePrinterTaskStore";

const { printerTasks } = storeToRefs(usePrinterTaskStore());
const { startPrinterTasks, stopPrinterTasks } = usePrinterTaskStore();

onMounted(() => {
  startPrinterTasks();
});

onUnmounted(() => {
  stopPrinterTasks();
});
</script>

<style scoped lang="scss"></style>
