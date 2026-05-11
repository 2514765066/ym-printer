<template>
  <section class="side-bar p-2 flex flex-col gap-1 bg-sidebar border-r">
    <div class="h-9 flex-center">
      <img src="@/assets/icon.png" class="size-5" />
    </div>

    <Item label="文档" to="/doc">
      <FilesIcon class="size-5.5" />
    </Item>

    <Item label="打印机任务队列" to="/print-task">
      <PrinterIcon class="size-5.5" />
    </Item>

    <div class="mt-auto">
      <Item label="设置" @click="handleDialog">
        <SettingsIcon class="size-5.5" />
      </Item>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FilesIcon, PrinterIcon, SettingsIcon } from "lucide-vue-next";
import Item from "./side-bar-item.vue";
import eventEmitter from "@/hooks/eventEmitter";

const handleDialog = () => {
  eventEmitter.emit("dialog-setting:show");
};
</script>

<style scoped lang="scss">
.side-bar {
  grid-area: side-bar;
}
</style>
