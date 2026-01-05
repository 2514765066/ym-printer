<template>
  <main class="print-window wh-screen grid bg-bg" ref="containerRef">
    <TitleBar />

    <ListBar />

    <ResizeHandle
      :containerRef="containerRef"
      :left-padding="200"
      :right-padding="400"
      style="grid-area: handle"
      v-model="printConfigWidth"
    />

    <ToolBar />

    <Content />
  </main>
</template>

<script setup lang="ts">
import ResizeHandle from "@/components/resize-handle.vue";
import TitleBar from "./title-bar/index.vue";
import ListBar from "./list-bar/index.vue";
import ToolBar from "./tool-bar/index.vue";
import Content from "./content/index.vue";
import { usePrintStore } from "../stores/usePrintStore";
import { useStorage } from "@vueuse/core";

usePrintStore();

//打印配置区域的宽度
const printConfigWidth = useStorage("print-config-width", 280);

const containerRef = useTemplateRef("containerRef");
</script>

<style lang="scss">
.print-window {
  --print-config-width: calc(v-bind("printConfigWidth") * 1px);

  grid-template-rows: 44px 50px calc(100vh - 44px - 50px);
  grid-template-columns: var(--print-config-width) 0 calc(
      100vw - var(--print-config-width)
    );

  grid-template-areas:
    "title-bar title-bar title-bar"
    "list-bar handle tool-bar"
    "list-bar handle content";
}
</style>
