<template>
  <section class="flex">
    <Printer
      class="max-w-60 border-none! ring-0! bg-transparent! hover:bg-accent/50! transition-colors"
    />

    <Tooltip label="更多操作" side="bottom">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button class="ml-auto" variant="ghost" size="icon">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" class="w-52">
          <DropdownMenuItem @select="handleReload">
            <RotateCwIcon />

            <span>刷新打印机任务队列</span>
          </DropdownMenuItem>

          <DropdownMenuItem :disabled="isPrinting" @select="handlePrintTest">
            <Spinner v-if="isPrinting" />

            <TestTubeDiagonalIcon v-else />

            <span>打印测试页</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            :disabled="isPrinting"
            variant="destructive"
            @select="handleRemove"
          >
            <Trash2Icon />

            <span>删除打印机所有任务</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  </section>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Printer from "@/components/printer.vue";
import Tooltip from "@/components/tooltip.vue";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import eventEmitter from "@/hooks/eventEmitter";
import { useLockFn } from "@/hooks/useLock";
import { usePrinterStore } from "@/stores/usePrinterStore";
import { usePrinterTaskStore } from "@/stores/usePrinterTaskStore";
import { useThrottleFn } from "@vueuse/core";
import {
  MoreHorizontalIcon,
  RotateCwIcon,
  TestTubeDiagonalIcon,
  Trash2Icon,
} from "lucide-vue-next";

const { selectedPrinter } = storeToRefs(usePrinterStore());
const { startPrinterTasks, removeAllPrinterTasks } = usePrinterTaskStore();

//打印测试页
const [isPrinting, handlePrintTest] = useLockFn(async () => {
  await ipcRenderer.invoke("printTest", selectedPrinter.value);

  eventEmitter.emit("success:show", "打印测试页完成");
});

//刷新打印任务列表
const handleReload = useThrottleFn(startPrinterTasks, 1000);

//删除所有任务
const handleRemove = async () => {
  await removeAllPrinterTasks();

  eventEmitter.emit("success:show", "已删除打印机所有任务");
};
</script>

<style scoped lang="scss"></style>
