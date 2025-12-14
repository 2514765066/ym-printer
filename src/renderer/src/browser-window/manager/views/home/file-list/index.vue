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

    <div class="flex flex-col" v-else>
      <header class="h-11 px-4 flex items-center gap-2 border-b border-border">
        <span class="text-sub text-sm">全选</span>

        <ElCheckbox
          v-model="checkAll"
          :indeterminate="status == 'hasCheck'"
          @change="toggleAllCheck"
        />

        <span class="ml-auto text-sub text-sm">
          选中: {{ checked.size }} 个
        </span>
      </header>

      <ElScrollbar
        height="calc(100vh - 44px - 44px)"
        view-class="p-2 flex flex-col gap-1"
      >
        <Item
          v-for="item in files.values()"
          :key="item.id"
          :data="item"
          :printed="isFinish(item.id)"
          :active="hasCheck(item.id)"
          @click="toggleCheck(item.id)"
          @dblclick="handlePrint(item)"
          @contextmenu="contextMenuRef?.open"
        />
      </ElScrollbar>
    </div>

    <ContextMenu :data="contextMenu" ref="menu" />
  </main>
</template>

<script setup lang="ts">
import { ContextMenu, MenuGroup } from "@/components/ui/menu";
import Item from "./file-list-item.vue";
import { ElScrollbar, ElCheckbox } from "element-plus";
import Tip from "@/components/drag-tip.vue";
import Empty from "@/components/empty.vue";
import vDrag from "@manager/hooks/useDrag";
import { useFileStore } from "@manager/stores/useFileStore";
import { FileInfo } from "@type";
import eventEmitter from "@/hooks/eventEmitter";
import useChecked from "@manager/hooks/useCheck";

const { files } = storeToRefs(useFileStore());
const { addFile, removeFile, isFinish } = useFileStore();
const {
  checkAll,
  status,
  checked,
  toggleCheck,
  hasCheck,
  toggleAllCheck,
  cancelCheck,
} = useChecked(files);

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
        label: "删除当前文件",
        icon: "remove",
        hoverColor: "#f87171",
        onSelect(data: FileInfo) {
          if (hasCheck(data.id)) {
            cancelCheck(data.id);
          }

          removeFile(data.id);

          eventEmitter.emit("success:show", "已删除文件");
        },
      },
      {
        label: "删除所有选中文件",
        icon: "remove",
        hoverColor: "#f87171",
        hidden: (data: FileInfo) => !hasCheck(data.id),
        onSelect() {
          for (const id of checked.value.keys()) {
            cancelCheck(id);
            removeFile(id);
          }

          eventEmitter.emit("success:show", "已删除任务");
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
