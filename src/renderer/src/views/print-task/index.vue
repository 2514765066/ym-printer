<template>
  <section class="flex flex-col relative">
    <QueueHeader class="p-1 z-10" />

    <div
      class="wh-full absolute left-50 top-50 -translate-x-50 -translate-y-50"
      v-if="printerTasks.length == 0"
    >
      <QueueEmpty />
    </div>

    <ElScrollbar class="flex-1" v-else>
      <QueueContent />
    </ElScrollbar>
  </section>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
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
