<template>
  <main class="print-queue grid">
    <PrinterList />

    <PrinterQueue />
  </main>
</template>

<script setup lang="ts">
import PrinterList from "./printer-list/index.vue";
import PrinterQueue from "./printer-queue/index.vue";
import { usePrinterTask } from "@manager/stores/usePrinterTask";

const { initPrinterTasks, clearPrinterTasks } = usePrinterTask();

//离开页面
onBeforeRouteLeave(() => {
  clearPrinterTasks();
});

//初始化调用
onMounted(() => {
  initPrinterTasks();
});
</script>

<style scoped lang="scss">
.print-queue {
  grid-template-columns: 280px calc(100% - 280px);

  grid-template-areas: "printer queue";
}
</style>
