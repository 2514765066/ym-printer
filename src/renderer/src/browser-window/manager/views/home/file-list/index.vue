<template>
  <main
    class="file relative border-r border-border"
    v-drag="{
      onDrop: handleDrop,
      change: handleChange,
    }"
  >
    <Tip v-if="isDraggingOver" />

    <Empty label="文档文件" icon="file" v-if="files.size == 0" />

    <ElScrollbar
      height="calc(100vh - 44px)"
      view-class="p-2 flex flex-col gap-1"
      v-else
    >
      <Item
        v-for="item in files.values()"
        :key="item.id"
        :data="item"
        :printed="isFinish(item.id)"
        @click="handlePrint(item)"
        @contextmenu="contextMenuRef?.open"
      />
    </ElScrollbar>
  </main>

  <MenuContext :data="contextMenu" ref="menu" />
</template>

<script setup lang="ts">
import { MenuContext, MenuGroup } from "@/components/ui/menu";
import Item from "./file-list-item.vue";
import { ElScrollbar } from "element-plus";
import Tip from "@/components/drag-tip.vue";
import Empty from "@/components/empty.vue";
import vDrag from "@manager/hooks/useDrag";
import { useFileStore } from "@manager/stores/useFileStore";
import { FileInfo } from "@type";
import eventEmitter from "@/hooks/eventEmitter";

const { files, finishFilesID } = storeToRefs(useFileStore());
const { addFile, removeFile, isFinish, clearFile } = useFileStore();

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
const handlePrint = (data: FileInfo) => {
  ipcRenderer.invoke("openPrint", {
    file: toRaw(data),
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
        label: '删除 "当前文件"',
        icon: "remove",
        hoverColor: "#f87171",

        onSelect(data: FileInfo) {
          removeFile(data.id);

          eventEmitter.emit("success:show", "已删除文件");
        },
      },
      {
        label: '删除 "所有打印完成文件"',
        icon: "remove",
        hoverColor: "#f87171",
        hidden: (data: FileInfo) => !isFinish(data.id),
        onSelect() {
          for (const id of finishFilesID.value) {
            removeFile(id);
          }

          eventEmitter.emit("success:show", "已删除所有打印完成文件");
        },
      },
      {
        label: '删除 "所有文件"',
        icon: "remove",
        hoverColor: "#f87171",
        onSelect() {
          clearFile();

          eventEmitter.emit("success:show", "已删除所有文件");
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
