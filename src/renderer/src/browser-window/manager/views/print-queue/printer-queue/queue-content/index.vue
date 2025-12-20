<template>
  <Empty
    class="flex-1"
    icon="queues"
    label="打印机队列"
    v-if="printerTasks.length == 0"
  />

  <Loading v-else-if="status == 'loading'" />

  <main class="flex flex-col" v-else>
    <ElScrollbar
      max-height="calc(100vh - 44px - 48px)"
      view-class="p-2 flex flex-col gap-1"
    >
      <ContentItem
        v-for="item in printerTasks"
        :key="item.id"
        :data="item"
        @contextmenu="contextMenuRef?.open"
      />
    </ElScrollbar>
  </main>

  <MenuContext :data="menu" ref="contextMenuRef" />
</template>

<script setup lang="ts">
import Empty from "@/components/empty.vue";
import { usePrinterTask } from "@manager/stores/usePrinterTask";
import { ElScrollbar } from "element-plus";
import ContentItem from "./content-item.vue";
import { MenuGroup, MenuContext } from "@/components/ui/menu";
import eventEmitter from "@/hooks/eventEmitter";
import Loading from "@/components/ui/loading/index.vue";

const { printerTasks, selectedPrinter, status } = storeToRefs(usePrinterTask());

const contextMenuRef = useTemplateRef("contextMenuRef");

const menu: MenuGroup[] = [
  {
    label: "更多操作",
    children: [
      {
        label: '删除 "当前任务"',
        icon: "remove",
        hoverColor: "#f87171",
        async onSelect(id: number) {
          await ipcRenderer.invoke(
            "removePrinterTask",
            selectedPrinter.value,
            id
          );

          eventEmitter.emit("success:show", "已删除当前任务");
        },
      },
      {
        label: '删除 "全部任务"',
        icon: "remove",
        hoverColor: "#f87171",
        async onSelect() {
          await ipcRenderer.invoke("removePrinterTask", selectedPrinter.value);

          eventEmitter.emit("success:show", "已删除所有任务");
        },
      },
    ],
  },
];
</script>

<style scoped lang="scss"></style>
