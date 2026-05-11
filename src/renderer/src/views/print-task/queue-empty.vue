<template>
  <Empty class="wh-full">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <PrinterIcon />
      </EmptyMedia>

      <EmptyTitle>暂无打印任务</EmptyTitle>

      <EmptyDescription> 当前打印机暂无打印任务请刷新或重试 </EmptyDescription>
    </EmptyHeader>

    <EmptyContent>
      <Button @click="handleReload">
        <RotateCwIcon />

        <span>刷新</span>
      </Button>
    </EmptyContent>
  </Empty>
</template>

<script setup lang="ts">
import { PrinterIcon, RotateCwIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useThrottleFn } from "@vueuse/core";
import { usePrinterTaskStore } from "@/stores/usePrinterTaskStore";

const { startPrinterTasks } = usePrinterTaskStore();

//刷新打印任务列表
const handleReload = useThrottleFn(startPrinterTasks, 1000);
</script>
