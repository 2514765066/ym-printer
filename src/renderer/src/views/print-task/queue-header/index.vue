<template>
  <section class="flex gap-2">
    <Printer class="max-w-60" />

    <Button
      class="ml-auto"
      variant="outline"
      :disabled="isPrinting"
      @click="handlePrintTest"
    >
      <Spinner v-if="isPrinting" />

      <TestTubeDiagonalIcon v-else />

      <span>打印测试页</span>
    </Button>

    <Button variant="outline" @click="handleReload">
      <RotateCwIcon />

      <span>刷新</span>
    </Button>
  </section>
</template>

<script setup lang="ts">
import Printer from "@/components/printer.vue";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import eventEmitter from "@/hooks/eventEmitter";
import { useLockFn } from "@/hooks/useLock";
import { usePrinterStore } from "@/stores/usePrinterStore";
import { usePrinterTaskStore } from "@/stores/usePrinterTaskStore";
import { useThrottleFn } from "@vueuse/core";
import { RotateCwIcon, TestTubeDiagonalIcon } from "lucide-vue-next";

const { selectedPrinter } = storeToRefs(usePrinterStore());
const { startPrinterTasks } = usePrinterTaskStore();

//打印测试页
const [isPrinting, handlePrintTest] = useLockFn(async () => {
  await ipcRenderer.invoke("printTest", selectedPrinter.value);

  eventEmitter.emit("success:show", "打印测试页完成");
});

//刷新打印任务列表
const handleReload = useThrottleFn(startPrinterTasks, 1000);
</script>

<style scoped lang="scss"></style>
