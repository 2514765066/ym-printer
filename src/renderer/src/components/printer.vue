<template>
  <Select v-model="model">
    <SelectTrigger
      class="max-w-60 border-none! ring-0! bg-transparent! hover:bg-accent/50! transition-colors"
    >
      <PrinterIcon />

      <SelectValue placeholder="请选择打印机" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem v-for="item in printers" :key="item" :value="item">
        {{ item }}
      </SelectItem>

      <Button variant="ghost" :disabled="isLock" @click="handleRefresh">
        <Spinner v-if="isLock" />

        <RotateCwIcon v-else />

        <span>重新获取打印机</span>
      </Button>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { usePrinterStore } from "@/stores/usePrinterStore";
import { PrinterIcon, RotateCwIcon } from "lucide-vue-next";
import { Button } from "./ui/button";
import { useLockFn } from "@/hooks/useLock";

const { printers } = storeToRefs(usePrinterStore());
const { getPrinters } = usePrinterStore();

const model = defineModel<string>();

const [isLock, handleRefresh] = useLockFn(getPrinters);
</script>

<style scoped lang="scss"></style>
