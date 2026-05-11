<template>
  <ElScrollbar
    ref="scrollbarRef"
    :wrap-class="`${panning ? 'cursor-grabbing' : 'cursor-grab'}`"
  >
    <div @mousedown="handleMousedown" @mousemove="handleMousemove">
      <PdfView />
    </div>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import PdfView from "./pdg-view.vue";
import { usePdfStore } from "@/stores/usePdfStore";
import { useEventListener } from "@vueuse/core";
import useMove from "@/hooks/useMove";

const { addScale, subScale } = usePdfStore();

//组件实例
const scrollbarRef = useTemplateRef("scrollbarRef");

const { panning, handleMousedown, handleMousemove } = useMove(
  () => scrollbarRef.value?.wrapRef,
);

//处理鼠标滚轮
useEventListener(
  "wheel",
  (e: WheelEvent) => {
    if (!e.ctrlKey) {
      return;
    }

    e.preventDefault();

    e.deltaY < 0 ? addScale() : subScale();
  },
  {
    passive: false,
  },
);
</script>

<style scoped lang="scss"></style>
