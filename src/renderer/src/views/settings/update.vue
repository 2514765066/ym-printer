<template>
  <Item label="检查更新" icon="update" sub="检查是否有版本更新">
    <ElButton @click="handleUpdate" text bg v-if="status == 'init'">
      检查更新
    </ElButton>

    <span class="px-2 text-main text-sm" v-else-if="status == 'checking'">
      正在检查更新...
    </span>

    <span
      class="px-2 text-main text-sm"
      v-else-if="status == 'update-not-available'"
    >
      已是最新版
    </span>

    <span
      class="px-2 text-main text-sm"
      v-else-if="status == 'update-available'"
    >
      下载中: {{ Math.floor(progress) }}%
    </span>
  </Item>
</template>

<script setup lang="ts">
import Item from "@/components/setting-item/index.vue";
import { ElButton } from "element-plus";

type Status = "init" | "checking" | "update-available" | "update-not-available";

//下载进度
const progress = ref(0);

//状态
const status = ref<Status>("init");

//检查更新
const handleUpdate = async () => {
  status.value = "checking";

  const res = await ipcRenderer.invoke("checkUpdata");

  if (res == true) {
    status.value = "update-available";
    return;
  }

  status.value = "update-not-available";
};

onMounted(async () => {
  //监听下载进度
  ipcRenderer.addListener("updateProgress", (_, percrent) => {
    progress.value = percrent;
  });
});
</script>

<style scoped lang="scss"></style>
