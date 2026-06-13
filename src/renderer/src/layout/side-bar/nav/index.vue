<template>
  <section class="px-2 flex flex-col gap-1">
    <NavItem
      label="打印机任务队列"
      description="打开打印机队列"
      @click="handlePrintTask"
    >
      <PrinterIcon class="size-4.5" />
    </NavItem>

    <NavItem
      label="打印范围预设"
      description="打开打印范围预设"
      @click="handlePreset"
    >
      <ClipboardListIcon class="size-4.5" />
    </NavItem>

    <NavItem label="价格" description="打开价格设置" @click="handlePrice">
      <CircleDollarSignIcon class="size-4.5" />
    </NavItem>

    <NavItem label="设置" description="打开设置 Ctrl+," @click="handleSettings">
      <SettingsIcon class="size-4.5" />
    </NavItem>
  </section>
</template>

<script setup lang="ts">
import {
  CircleDollarSignIcon,
  ClipboardListIcon,
  PrinterIcon,
  SettingsIcon,
} from "lucide-vue-next";
import NavItem from "./nav-item.vue";
import eventEmitter from "@/hooks/eventEmitter";

//打开打印机任务队列
const handlePrintTask = () => {
  eventEmitter.emit("dialog-print-task:show");
};

//打开打印范围预设
const handlePreset = () => {
  eventEmitter.emit("dialog-setting:show", "preset");
};

//打开打印范围预设
const handlePrice = () => {
  eventEmitter.emit("dialog-setting:show", "price");
};

//打开设置
const handleSettings = () => {
  eventEmitter.emit("dialog-setting:show");
};
</script>

<style scoped lang="scss"></style>
