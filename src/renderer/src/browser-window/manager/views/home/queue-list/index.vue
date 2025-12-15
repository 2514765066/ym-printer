<template>
  <section class="finish-queue">
    <Empty label="完成队列" icon="queue" v-if="queue.size == 0" />

    <QueueContent v-else />
  </section>
</template>

<script setup lang="ts">
import Empty from "@/components/empty.vue";
import { useQueueStore } from "@manager/stores/useQueueStore";
import QueueContent from "./queue-content/index.vue";

const { queue } = storeToRefs(useQueueStore());
</script>

<style scoped lang="scss">
.finish-queue {
  grid-area: finish-queue;
}
</style>
