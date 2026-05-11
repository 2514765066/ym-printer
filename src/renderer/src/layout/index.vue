<template>
  <div
    class="manager-window wh-screen grid"
    v-drag="{
      onDrop: handleDrop,
      onChange: handleChange,
    }"
  >
    <TitleBar />

    <SideBar />

    <RouterView />
  </div>

  <DragOverlay v-if="isDragOver" />
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

const isDragOver = ref(false);

//处理状态改变
const handleChange = (value: boolean) => {
  isDragOver.value = value;
};

//拖拽结束
const handleDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files;

  if (!files) return;

  addDoc(Array.from(files));
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
