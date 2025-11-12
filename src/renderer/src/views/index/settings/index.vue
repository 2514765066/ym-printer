<template>
  <main class="settings p-2 flex flex-col">
    <Item label="单面价格" icon="price" sub="打印单面打印的单价">
      <ElInputNumber
        :step="0.05"
        :min="0"
        :precision="2"
        v-model="data.simplexPrice"
        :value-on-clear="0"
      />
    </Item>

    <Item label="双面价格" icon="price" sub="打印双面打印的单价">
      <ElInputNumber
        :step="0.05"
        :min="0"
        :precision="2"
        v-model="data.duplexPrice"
        :value-on-clear="0"
      />
    </Item>

    <Item
      label="缓存"
      icon="file"
      sub="缓存在软件中的文档（注意: 这会清空所有目录中所有文件）"
    >
      <ElButton style="width: 150px" @click="handleClear">
        清除缓存: {{ formatSize(cacheSize) }}
      </ElButton>
    </Item>

    <Item label="版本" icon="info" sub="当前软件版本">
      <span class="text-main text-sm">v{{ version }}</span>
    </Item>
  </main>
</template>

<script setup lang="ts">
import Item from "./item.vue";
import { useFileStore } from "@/stores/useFileStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { ElButton, ElInputNumber } from "element-plus";
import { version } from "@/service/info";

const { data } = storeToRefs(useSettingsStore());
const { clear } = useFileStore();

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

  clear();

  cacheSize.value = 0;
};

onMounted(async () => {
  cacheSize.value = await ipcRenderer.invoke("getCacheSize");
});
</script>

<style scoped lang="scss"></style>
