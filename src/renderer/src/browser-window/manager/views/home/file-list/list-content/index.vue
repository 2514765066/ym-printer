<template>
  <main class="flex flex-col">
    <ListHeader v-model="sortRule" />

    <ElScrollbar
      height="calc(100vh - 44px - 44px)"
      view-class="p-2 flex flex-col gap-1"
    >
      <Item
        v-for="item in sortData"
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
import Item from "./content-item.vue";
import { ElScrollbar } from "element-plus";
import ListHeader from "./content-header.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { useFileStore } from "@manager/stores/useFileStore";
import { FileInfo } from "@type";

const { files, finishFilesID } = storeToRefs(useFileStore());
const { removeFile, isFinish, clearFile } = useFileStore();

const contextMenuRef = useTemplateRef("menu");

//排序规则
const sortRule = ref("time-asc");

const sortMap = {
  "time-asc": (data: FileInfo[]) => {
    return data;
  },
  "time-desc": (data: FileInfo[]) => {
    return data.toReversed();
  },
  "finish-asc": (data: FileInfo[]) => {
    return data.toSorted((a, b) => {
      const aIn = finishFilesID.value.has(a.id);
      const bIn = finishFilesID.value.has(b.id);

      return Number(bIn) - Number(aIn);
    });
  },
  "finish-desc": (data: FileInfo[]) => {
    return data.toSorted((a, b) => {
      const aIn = finishFilesID.value.has(a.id);
      const bIn = finishFilesID.value.has(b.id);

      return Number(aIn) - Number(bIn);
    });
  },
};

//排序数据
const sortData = computed(() => {
  const res = Array.from(files.value.values());

  const fn = sortMap[sortRule.value];

  return fn(res);
});

//打印页面
const handlePrint = (data: FileInfo) => {
  ipcRenderer.invoke("openPrint", {
    file: toRaw(data),
  });
};

//右键菜单
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

          eventEmitter.emit("success:show", "已删除当前文件");
        },
      },
      {
        label: '删除 "所有打印完成的文件"',
        icon: "remove",
        hoverColor: "#f87171",
        hidden: (data: FileInfo) => !isFinish(data.id),
        onSelect() {
          for (const id of finishFilesID.value) {
            removeFile(id);
          }

          eventEmitter.emit("success:show", "已删除所有打印完成的文件");
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

<style scoped lang="scss"></style>
