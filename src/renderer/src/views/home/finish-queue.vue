<template>
  <main class="finish-queue">
    <Empty label="完成队列" icon="queue" v-if="finishQueue.size == 0" />

    <ElScrollbar view-class="p-2 flex flex-col gap-1" v-else>
      <Item v-for="item in finishQueue.values()" :key="item.id" :data="item" />
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import Empty from "@/components/empty.vue";
import Item from "@/components/finish-queue-item/index.vue";
import { ElScrollbar } from "element-plus";
import { useQueueStore } from "@/stores/useQueueStore";

const { finishQueue } = storeToRefs(useQueueStore());
</script>

<style scoped lang="scss">
.finish-queue {
  grid-area: finish-queue;
}
</style>
