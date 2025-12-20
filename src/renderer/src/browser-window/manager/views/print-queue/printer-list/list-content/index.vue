<template>
  <main class="flex flex-col">
    <ElScrollbar
      height="calc(100vh - 44px)"
      view-class="p-2 flex flex-col gap-1"
    >
      <Item
        v-for="item in printers"
        :key="item"
        :label="item"
        :active="item == selectedPrinter"
        @click="setPrinter(item)"
      />
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import Item from "./content-item.vue";
import { ElScrollbar } from "element-plus";
import { usePrinterTask } from "@manager/stores/usePrinterTask";

const { printers, selectedPrinter } = storeToRefs(usePrinterTask());
const { setPrinter } = usePrinterTask();
</script>

<style scoped lang="scss"></style>
