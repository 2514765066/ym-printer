<template>
  <section class="flex">
    <Printer
      class="max-w-60 border-none! ring-0! bg-transparent! hover:bg-accent/50! transition-colors"
    />

    <Tooltip label="打印测试页" side="bottom">
      <Button
        class="ml-auto"
        variant="ghost"
        size="icon-sm"
        :disabled="isPrinting"
        @click="handlePrintTest"
      >
        <Spinner class="size-4" v-if="isPrinting" />

        <TestTubeDiagonalIcon class="size-4" v-else />
      </Button>
    </Tooltip>

    <Tooltip label="刷新" side="bottom">
      <Button variant="ghost" size="icon-sm" @click="handleReload">
        <RotateCwIcon class="size-4" />
      </Button>
    </Tooltip>
  </section>
</template>

<script setup lang="ts">
import Printer from "@/components/printer.vue";
import Tooltip from "@/components/tooltip.vue";
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
