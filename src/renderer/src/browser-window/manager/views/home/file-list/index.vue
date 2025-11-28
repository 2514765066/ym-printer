<template>
  <ul
    class="file relative border-r border-border"
    v-drag="{
      onDrop: handleDrop,
      change: handleChange,
    }"
  >
    <Tip v-if="isDraggingOver" />

    <Empty label="文档文件" icon="file" v-if="files.size == 0" />

    <ElScrollbar view-class="p-2 flex flex-col gap-1" v-else>
      <Item
        v-for="item in files.values()"
        :key="item.id"
        :data="item"
        :printed="hasQueue(item.id)"
        @click="handlePrint(item)"
        @contextmenu="contextMenuRef?.open"
      />
    </ElScrollbar>

    <ContextMenu :data="contextMenu" ref="menu" />
  </ul>
</template>

<script setup lang="ts">
import { ContextMenu, MenuGroup } from "@/components/menu";
import Item from "./file-list-item.vue";
import { ElScrollbar } from "element-plus";
import Tip from "@/components/drag-tip.vue";
import Empty from "@/components/empty.vue";
import vDrag from "@manager/hooks/useDrag";
import { useQueueStore } from "@manager/stores/useQueueStore";
import { useFileStore } from "@manager/stores/useFileStore";
import { FileInfo } from "@type";
import eventEmitter from "@/hooks/eventEmitter";

const { files } = storeToRefs(useFileStore());
const { addFile, removeFile } = useFileStore();
const { hasQueue } = useQueueStore();

const contextMenuRef = useTemplateRef("menu");

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

//打印页面
const handlePrint = (file: FileInfo) => {
  ipcRenderer.invoke("openPrint", {
    file: toRaw(file),
  });
};

const contextMenu: MenuGroup[] = [
  {
    label: "更多操作",
    children: [
      {
        label: "打印预览",
        icon: "print",
        onSelect: handlePrint,
      },
    ],
  },
  {
    children: [
      {
        label: "删除文件",
        icon: "remove",
        hoverColor: "#f87171",
        onSelect(data: FileInfo) {
          removeFile(data.id);

          eventEmitter.emit("success:show", "已删除文件");
        },
      },
    ],
  },
];
</script>

<style scoped lang="scss">
.file {
  grid-area: file;
}
</style>
