<template>
  <section
    class="h-12 px-2 flex justify-between items-center gap-2 shrink-0 border-b border-border"
  >
    <Button bg="#262626" :loading="isPrinting" @click="handlePrintTest">
      打印测试页
    </Button>

    <Tooltip label="刷新打印队列">
      <Button bg="#262626" square @click="reloadPrinterTasks">
        <Icon icon="reload" width="18" />
      </Button>
    </Tooltip>
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button.vue";
import eventEmitter from "@/hooks/eventEmitter";
import useLoading from "@/hooks/useLoading";
import { Icon } from "@iconify/vue";
import Tooltip from "@/components/ui/tooltip.vue";
import { usePrinterTask } from "@manager/stores/usePrinterTask";
import throttle from "@/utils/throttle";

const { selectedPrinter } = storeToRefs(usePrinterTask());
const { initPrinterTasks } = usePrinterTask();

const printers = ref<string[]>([]);

//打印测试页
const [isPrinting, handlePrintTest] = useLoading(async () => {
  await ipcRenderer.invoke("printTest", selectedPrinter.value);

  eventEmitter.emit("success:show", "打印测试页完成");
});

//刷新打印任务列表
const reloadPrinterTasks = throttle(initPrinterTasks);

onMounted(async () => {
  printers.value = await ipcRenderer.invoke("getPrinters");
});
</script>

<style scoped lang="scss"></style>
