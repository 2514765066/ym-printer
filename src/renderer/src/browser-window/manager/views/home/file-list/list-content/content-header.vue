<template>
  <section class="h-11 p-2 flex items-center gap-2 border-b border-border">
    <span class="text-main text-sm">文件: {{ files.size }}</span>

    <MenuTooltip :width="200" trigger="hover" :data="sortMenu">
      <button
        class="ml-auto h-full flex-center rounded-md aspect-square hover:bg-hover"
      >
        <Icon icon="sort" size="18" />
      </button>
    </MenuTooltip>
  </section>
</template>

<script setup lang="ts">
import { useFileStore } from "@manager/stores/useFileStore";
import { Icon } from "@/components/ui/icon";
import { MenuGroup, MenuTooltip } from "@/components/ui/menu";

const { files } = storeToRefs(useFileStore());

const model = defineModel<string>();

const sortMenu: MenuGroup[] = [
  {
    label: "排序",
    children: [
      {
        label: "按时间正序",
        icon: "time",
        sub: () => (model.value == "time-asc" ? "√" : ""),
        onSelect() {
          model.value = "time-asc";
        },
      },
      {
        label: "按时间倒序",
        icon: "time",
        sub: () => (model.value == "time-desc" ? "√" : ""),
        onSelect() {
          model.value = "time-desc";
        },
      },
    ],
  },
  {
    children: [
      {
        label: "按是否完成正序",
        icon: "queue",
        sub: () => (model.value == "finish-asc" ? "√" : ""),
        onSelect() {
          model.value = "finish-asc";
        },
      },
      {
        label: "按是否完成倒序",
        icon: "queue",
        sub: () => (model.value == "finish-desc" ? "√" : ""),
        onSelect() {
          model.value = "finish-desc";
        },
      },
    ],
  },
];
</script>

<style scoped lang="scss"></style>
