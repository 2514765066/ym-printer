<template>
  <div class="manager-window wh-screen grid" v-drag="dragOption">
    <TitleBar />

    <SideBar />

    <RouterView />
  </div>

  <DragOverlay v-if="isDragging" />
</template>

<script setup lang="ts">
import SideBar from "./side-bar/index.vue";
import TitleBar from "./title-bar/index.vue";
import { useUpdateStore } from "@/stores/useUpdateStore";
import vDrag from "@/hooks/useDrag";
import { useDocStore } from "@/stores/useDocStore";
import DragOverlay from "./drag-overlay .vue";

//修复进入必须进入设置界面才会检查更新的bug
useUpdateStore();
const { addDoc } = useDocStore();

const isDragging = ref(false);

//拖拽配置
const dragOption = {
  onChange: (val: boolean) => {
    isDragging.value = val;
  },

  onDrop: (e: DragEvent) => {
    const files = e.dataTransfer?.files;

    if (!files) return;

    addDoc(Array.from(files));
  },
};
</script>

<style lang="scss">
.manager-window {
  grid-template-rows: 44px calc(100vh - 44px);
  grid-template-columns: 50px calc(100vw - 50px);

  grid-template-areas:
    "side-bar title-bar"
    "side-bar content";
}
</style>
