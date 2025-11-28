<template>
  <ElScrollbar class="content">
    <PdfView />
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import PdfView from "@print/components/pdg-view.vue";
import { useViewStore } from "@print/stores/useViewStore";

const { addScale, subScale } = useViewStore();

//处理鼠标滚轮
const handleWheel = (e: WheelEvent) => {
  if (!e.ctrlKey) {
    return;
  }

  e.preventDefault();

  e.deltaY < 0 ? addScale() : subScale();
};

onMounted(() => {
  window.addEventListener("wheel", handleWheel, { passive: false });
});

onBeforeUnmount(() => {
  window.removeEventListener("wheel", handleWheel);
});
</script>

<style scoped lang="scss">
.content {
  grid-area: "content";
}
</style>
