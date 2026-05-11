<template>
  <Select v-model="selectedPrinter">
    <SelectTrigger :class="class">
      <PrinterIcon />

      <SelectValue placeholder="请选择打印机" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem v-for="item in printers" :key="item" :value="item">
        {{ item }}
      </SelectItem>
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
import { usePrinterStore } from "@/stores/usePrinterStore";
import { ClassValue } from "clsx";
import { PrinterIcon } from "lucide-vue-next";

const { printers, selectedPrinter } = storeToRefs(usePrinterStore());

defineProps<{
  class?: ClassValue;
}>();
</script>

<style scoped lang="scss"></style>
