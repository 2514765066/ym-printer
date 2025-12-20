<template>
  <section class="printer-list border-r border-border">
    <Empty label="打印机" icon="print" v-if="printers.length == 0" />

    <ListContent v-else />
  </section>
</template>

<script setup lang="ts">
import Empty from "@/components/empty.vue";
import ListContent from "./list-content/index.vue";
import { usePrinterTask } from "@manager/stores/usePrinterTask";

const { printers } = storeToRefs(usePrinterTask());
</script>

<style scoped lang="scss">
.printer-list {
  grid-area: printer;
}
</style>
