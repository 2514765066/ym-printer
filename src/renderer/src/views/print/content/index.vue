<template>
  <ElScrollbar class="content">
    <div class="w-fit mx-auto">
      <PdfView />
    </div>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import PdfView from "./pdg-view.vue";
import { usePdfStore } from "@/stores/usePdfStore";

const { addScale, subScale } = usePdfStore();

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
