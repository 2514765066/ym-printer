<template>
  <main class="queue">
    <Empty label="打印队列" icon="queue" v-if="printQueue.size == 0" />

    <ElScrollbar view-class="p-2 flex flex-col gap-1" v-else>
      <Item v-for="item in printQueue.values()" :key="item.id" :data="item" />
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import Empty from "@/components/empty.vue";
import Item from "@/components/queue-item/index.vue";
import { ElScrollbar } from "element-plus";
import { useQueueStore } from "@/stores/useQueueStore";

const { printQueue } = storeToRefs(useQueueStore());
</script>

<style scoped lang="scss">
.queue {
  grid-area: queue;

  border-bottom: 1px solid var(--border-color);
}
</style>
