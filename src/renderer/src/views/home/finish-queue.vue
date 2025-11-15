<template>
  <main class="finish-queue">
    <Empty label="完成队列" icon="queue" v-if="finishQueue.size == 0" />

    <div class="flex- flex-col" v-else>
      <section class="tool-bar px-4 py-2 flex items-center gap-2">
        <span class="text-sub text-sm">全选</span>

        <ElCheckbox
          v-model="check"
          @change="handleSelectAll"
          :indeterminate="indeterminate"
        />

        <span class="ml-auto text-sub text-sm">总价: {{ price }} 元</span>
      </section>

      <ElScrollbar view-class="p-2 flex flex-col gap-1">
        <Item
          v-for="item in finishQueue.values()"
          :key="item.id"
          :data="item"
          :active="selectedList.has(item.id)"
          @click="addList(item)"
        />
      </ElScrollbar>
    </div>
  </main>
</template>

<script setup lang="ts">
import Empty from "@/components/empty.vue";
import Item from "@/components/finish-queue-item/index.vue";
import { CheckboxValueType, ElCheckbox, ElScrollbar } from "element-plus";
import { QueueItem, useQueueStore } from "@/stores/useQueueStore";
import { useSettingsStore } from "@/stores/useSettingsStore";

const settingsStore = useSettingsStore();
const { finishQueue } = storeToRefs(useQueueStore());

const selectedList = ref(new Map<string, number>());

const check = ref(false);

//总价格
const price = computed(() => {
  let res = 0;

  for (const p of selectedList.value.values()) {
    res += p;
  }

  return res.toFixed(2);
});

//是否全选
const indeterminate = computed(() => {
  if (selectedList.value.size == 0) {
    return false;
  }

  return selectedList.value.size < finishQueue.value.size;
});

//添加到选中列表
const addList = (item: QueueItem) => {
  if (selectedList.value.has(item.id)) {
    selectedList.value.delete(item.id);

    if (selectedList.value.size == 0) {
      check.value = false;
    }
    return;
  }

  const price = item.getPrice(
    settingsStore.data.simplexPrice,
    settingsStore.data.duplexPrice
  );

  selectedList.value.set(item.id, price);

  if (selectedList.value.size == finishQueue.value.size) {
    check.value = true;
    return;
  }
};

//全选
const handleSelectAll = (val: CheckboxValueType) => {
  if (val) {
    for (const item of finishQueue.value.values()) {
      addList(item);
    }
    return;
  }

  selectedList.value.clear();
};
</script>

<style scoped lang="scss">
.finish-queue {
  grid-area: finish-queue;

  .tool-bar {
    border-bottom: 1px solid var(--border-color);
  }
}
</style>
