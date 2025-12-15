<template>
  <section
    class="file relative border-r border-border"
    v-drag="{
      onDrop: handleDrop,
      onChange: handleChange,
    }"
  >
    <ListDragTip v-if="isDraggingOver" />

    <Empty label="文档文件" icon="file" v-if="files.size == 0" />

    <ListContent v-else />
  </section>
</template>

<script setup lang="ts">
import ListDragTip from "./list-drag-tip.vue";
import Empty from "@/components/empty.vue";
import ListContent from "./list-content/index.vue";
import vDrag from "@manager/hooks/useDrag";
import { useFileStore } from "@manager/stores/useFileStore";

const { files } = storeToRefs(useFileStore());
const { addFile } = useFileStore();

//是否拖拽悬浮
const isDraggingOver = ref(false);

//处理状态改变
const handleChange = (value: boolean) => {
  isDraggingOver.value = value;
};

//拖拽结束
const handleDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files;

  if (!files) return;

  addFile(Array.from(files));
};
</script>

<style scoped lang="scss">
.file {
  grid-area: file;
}
</style>
