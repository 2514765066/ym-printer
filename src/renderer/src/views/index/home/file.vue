<template>
  <main
    class="file relative"
    v-drag="{
      onDrop: handleDrop,
      change: handleChange,
    }"
  >
    <Tip v-if="isDraggingOver" />

    <Empty label="文档文件" icon="file" v-if="data.size == 0" />

    <ElScrollbar view-class="p-2 flex flex-col gap-1" v-else>
      <Item
        v-for="item in data.values()"
        :key="item.id"
        :data="item"
        @click="handlePreview(item)"
      />
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import Tip from "@/components/drag-tip.vue";
import vDrag from "@/hooks/useDrag";
import { useFileStore } from "@/stores/useFileStore";
import Item from "@/components/file-item/index.vue";
import { ElScrollbar } from "element-plus";
import { FileInfo } from "@type";
import Empty from "@/components/empty.vue";

const { data } = storeToRefs(useFileStore());
const { select, add } = useFileStore();
const router = useRouter();

const isDraggingOver = ref(false);

//处理状态改变
const handleChange = (value: boolean) => {
  isDraggingOver.value = value;
};

//处理预览
const handlePreview = (item: FileInfo) => {
  select(item.id);

  router.push("/print");
};

//拖拽结束
const handleDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files;

  if (!files) return;

  add(Array.from(files));
};
</script>

<style scoped lang="scss">
.file {
  grid-area: file;

  border-right: 1px solid var(--border-color);
}
</style>
