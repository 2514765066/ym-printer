<template>
  <ElScrollbar class="content" ref="scrollbarRef">
    <div
      class="hover:cursor-grab"
      @mousedown="handleMousedown"
      @mousemove="handleMousemove"
    >
      <PdfView />
    </div>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import PdfView from "@print/components/pdg-view.vue";
import { useViewStore } from "@print/stores/useViewStore";
import { useEventListener } from "@vueuse/core";
import useMove from "../../hooks/useMove";

const { addScale, subScale } = useViewStore();

//组件实例
const scrollbarRef = useTemplateRef("scrollbarRef");

const { handleMousedown, handleMousemove } = useMove(
  () => scrollbarRef.value?.wrapRef
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
  }
);
</script>

<style scoped lang="scss">
.content {
  grid-area: "content";
}
</style>
