<template>
  <main class="flex flex-col">
    <header class="h-11 px-4 flex items-center gap-2 border-b border-border">
      <span class="text-sub text-sm">全选</span>

      <ElCheckbox
        v-model="checkAll"
        :indeterminate="status == 'hasCheck'"
        @change="toggleAllCheck"
      />

      <span class="ml-auto text-sub text-sm">总价: {{ price }} 元</span>
    </header>

    <ElScrollbar
      height="calc(100vh - 44px - 44px)"
      view-class="p-2 flex flex-col gap-1"
    >
      <Item
        v-for="item in queue.values()"
        :key="item.id"
        :data="item"
        :active="hasCheck(item.id)"
        @click="toggleCheck(item.id)"
        @dblclick="handlePreview(item)"
        @contextmenu="contextMenuRef?.open"
      />
    </ElScrollbar>
  </main>

  <MenuContext :data="contextMenu" ref="menu" />
</template>

<script setup lang="ts">
import { MenuContext, MenuGroup } from "@/components/ui/menu";
import { ElCheckbox, ElScrollbar } from "element-plus";
import Item from "./content-item.vue";
import { useQueueStore } from "@manager/stores/useQueueStore";
import useChecked from "@manager/hooks/useChecked";
import { getPrice } from "@/utils/price";
import { QueueItem } from "@type";
import eventEmitter from "@/hooks/eventEmitter";

const { queue } = storeToRefs(useQueueStore());
const { getQueue, removeQueue, clearQueue } = useQueueStore();

const {
  checkAll,
  status,
  checked,
  toggleCheck,
  hasCheck,
  toggleAllCheck,
  cancelCheck,
} = useChecked(queue);

const contextMenuRef = useTemplateRef("menu");

//总价格
const price = computed(() => {
  let res = 0;

  for (const id of checked.value.values()) {
    const item = getQueue(id);

    if (!item) {
      continue;
    }

    res += getPrice(item.range, item.config.count) * 100;
  }

  return (res / 100).toFixed(2);
});

const handlePreview = (data: QueueItem) => {
  ipcRenderer.invoke("openPrint", {
    file: toRaw(data.file),
    config: toRaw(data.config),
  });
};

const contextMenu: MenuGroup[] = [
  {
    label: "更多操作",
    children: [
      {
        label: "打印预览",
        icon: "print",
        onSelect: handlePreview,
      },
    ],
  },
  {
    children: [
      {
        label: '删除 "当前任务"',
        icon: "remove",
        hoverColor: "#f87171",
        onSelect(data: QueueItem) {
          if (hasCheck(data.id)) {
            cancelCheck(data.id);
          }

          removeQueue(data.id);

          eventEmitter.emit("success:show", "已删除当前任务");
        },
      },
      {
        label: '删除 "所有选中任务"',
        icon: "remove",
        hoverColor: "#f87171",
        hidden: (data: QueueItem) => !hasCheck(data.id),
        onSelect() {
          for (const id of checked.value.keys()) {
            cancelCheck(id);
            removeQueue(id);
          }

          eventEmitter.emit("success:show", "已删除所有选中任务");
        },
      },
      {
        label: '删除 "所有任务"',
        icon: "remove",
        hoverColor: "#f87171",

        onSelect() {
          clearQueue();

          eventEmitter.emit("success:show", "已删除所有任务");
        },
      },
    ],
  },
];
</script>

<style scoped lang="scss"></style>
