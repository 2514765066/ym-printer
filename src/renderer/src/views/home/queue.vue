<template>
  <main class="queue">
    <Empty label="打印队列" icon="queue" v-if="printQueue.size == 0" />

    <div class="flex- flex-col" v-else>
      <section class="tool-bar px-4 py-2 flex items-center gap-2">
        <span class="text-sub text-sm">队列数量: {{ printQueue.size }}</span>

        <Tip label="开始打印第一个">
          <button
            class="ml-auto w-8 flex-center aspect-square rounded-md"
            @click="handlePrintFirst"
          >
            <Icon icon="play" size="20" />
          </button>
        </Tip>
      </section>

      <ElScrollbar view-class="p-2 flex flex-col gap-1">
        <Item
          v-for="(item, index) in printQueue.values()"
          :key="item.id"
          :data="item"
          :first="index == 0"
          @click="handlePreview(item)"
        />
      </ElScrollbar>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Tip } from "@/components/tooltip";
import Icon from "@/components/icon/index.vue";
import Empty from "@/components/empty.vue";
import Item from "@/components/queue-item/index.vue";
import { ElScrollbar } from "element-plus";
import { QueueItem, useQueueStore } from "@/stores/useQueueStore";
import eventEmitter from "@/hooks/eventEmitter";

const { printQueue } = storeToRefs(useQueueStore());

const handlePreview = (item: QueueItem) => {
  eventEmitter.emit(
    "print:show",
    config => {
      item.setConfig(config);

      eventEmitter.emit("success:show", "已更新打印配置");
    },
    item.config,
    item.file
  );
};

//开始打印第一个
const handlePrintFirst = () => {
  eventEmitter.emit("printFirst");
};
</script>

<style scoped lang="scss">
.queue {
  grid-area: queue;

  border-bottom: 1px solid var(--border-color);

  .tool-bar {
    border-bottom: 1px solid var(--border-color);

    button {
      transition: background-color 0.1s;

      &:hover {
        background-color: var(--hover-bg-color);
      }
    }
  }
}
</style>
