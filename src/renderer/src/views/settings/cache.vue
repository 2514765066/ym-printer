<template>
  <Item
    label="缓存"
    icon="file"
    sub="缓存在软件中的文档（注意: 这会清空所有目录中所有文件）"
  >
    <ElButton @click="handleClear" text bg>
      清除缓存: {{ formatSize(cacheSize) }}
    </ElButton>
  </Item>
</template>

<script setup lang="ts">
import Item from "@/components/setting-item/index.vue";
import { ElButton } from "element-plus";
import eventEmitter from "@/hooks/eventEmitter";
import { useFileStore } from "@/stores/useFileStore";
import { useQueueStore } from "@/stores/useQueueStore";

const fileStore = useFileStore();
const clearQueue = useQueueStore();

const cacheSize = ref(0);

const formatSize = (size: number) => {
  const mb = size / 1024 / 1024;

  if (mb > 1024) {
    return (mb / 1024).toFixed(2) + "GB";
  }

  if (mb > 100) {
    return Math.floor(mb) + "MB";
  }

  if (mb > 10) {
    return mb.toFixed(1) + "MB";
  }

  return mb.toFixed(2) + "MB";
};

//清空缓存
const handleClear = async () => {
  await ipcRenderer.invoke("clearCache");

  fileStore.clear();

  clearQueue.clearQueue();

  cacheSize.value = 0;

  eventEmitter.emit("success:show", "已清除缓存");
};

onMounted(async () => {
  cacheSize.value = await ipcRenderer.invoke("getCacheSize");
});
</script>

<style scoped lang="scss"></style>
