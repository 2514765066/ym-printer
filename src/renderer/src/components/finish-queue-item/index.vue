<template>
  <ContextMenu :data="menu">
    <li class="p-2 flex items-center gap-2 rounded-md">
      <ExtIcon class="h-8" :ext="data.file.ext" />

      <div class="flex flex-col gap-0.5 overflow-hidden">
        <span class="text-sm text-main ellipsis">
          {{ data.config.remarks || data.file.name }}
        </span>

        <div class="flex gap-6">
          <span class="text-main-darken text-xs">
            总份数: {{ data.config.count }}份
          </span>

          <span
            class="text-main-darken text-xs"
            v-if="data.config.simplexRange"
          >
            单打范围: {{ data.config.simplexRange }}
          </span>

          <span
            class="text-main-darken text-xs"
            v-if="data.config.simplexRange"
          >
            单打份数: {{ data.config.simplexCount }}份
          </span>

          <span class="text-main-darken text-xs" v-if="data.config.duplexRange">
            双打范围: {{ data.config.duplexRange }}
          </span>
        </div>
      </div>

      <span class="ml-auto text-sub text-sm">{{ price }} 元</span>
    </li>
  </ContextMenu>
</template>

<script setup lang="ts">
import ExtIcon from "@/components/icon/ext-icon.vue";
import { ContextMenu } from "@/components/tooltip";
import { MenuGrounp } from "@/components/tooltip/BaseMenu";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { QueueItem, useQueueStore } from "@/stores/useQueueStore";
import eventEmitter from "@/hooks/eventEmitter";

const settingsStore = useSettingsStore();
const { removeFinsihQueue, addQueue } = useQueueStore();

const props = defineProps<{
  data: QueueItem;
}>();

const menu: MenuGrounp[] = [
  {
    title: "更多操作",
    children: [
      {
        title: "加入打印队列",
        icon: "play",
        async onSelect() {
          addQueue(props.data);

          removeFinsihQueue(props.data.id);

          eventEmitter.emit("success:show", "已加入打印队列");
        },
      },
      {
        title: "删除当前任务",
        icon: "remove",
        hoverColor: "#f87171",
        onSelect() {
          removeFinsihQueue(props.data.id);

          eventEmitter.emit("success:show", "已删除任务");
        },
      },
    ],
  },
];

//计算价格
const price = computed(() => {
  return props.data.getPrice(
    settingsStore.data.simplexPrice,
    settingsStore.data.duplexPrice
  );
});
</script>

<style scoped lang="scss">
li {
  transition: background-color 0.1s;

  &:hover {
    background-color: var(--hover-bg-color);
  }
}
</style>
