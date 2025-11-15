<template>
  <ElScrollbar ref="scrollbar" class="content">
    <PdfView @update="scrollTop" />
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import PdfView from "./pdg-view.vue";
import { usePdfStore } from "@/stores/usePdfStore";

const { addScale, subScale } = usePdfStore();

const scrollbarRef = useTemplateRef("scrollbar");

//滚动到顶部
const scrollTop = () => {
  scrollbarRef.value?.scrollTo(0, 0);
};

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
