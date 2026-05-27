<template>
  <section class="px-2 flex flex-col gap-1">
    <NavItem label="打印机任务队列" to="/print-task">
      <PrinterIcon class="size-4.5" />
    </NavItem>

    <NavItem label="设置" @click="handleDialog">
      <SettingsIcon class="size-4.5" />
    </NavItem>
  </section>
</template>

<script setup lang="ts">
import { PrinterIcon, SettingsIcon } from "lucide-vue-next";
import NavItem from "./nav-item.vue";
import eventEmitter from "@/hooks/eventEmitter";

const handleDialog = () => {
  eventEmitter.emit("dialog-setting:show");
};
</script>

<style scoped lang="scss"></style>
