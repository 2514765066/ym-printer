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
      <Button :disabled="reloadLock" @click="handleReload">
        <Spinner v-if="reloadLock" />

        <RotateCwIcon v-else />

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
import { usePrinterTaskStore } from "@/stores/usePrinterTaskStore";
import { useLockFn } from "@/hooks/useLock";
import { Spinner } from "@/components/ui/spinner";

const { startPrinterTasks } = usePrinterTaskStore();

const [reloadLock, handleReload] = useLockFn(startPrinterTasks);
</script>
