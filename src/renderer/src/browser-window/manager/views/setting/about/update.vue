<template>
  <Item label="检查更新" icon="update" sub="检查是否有版本更新">
    <ElButton @click="checkUpdate" text bg v-if="status == 'init'">
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
      下载中: {{ Math.floor(downloadProgress) }}%
    </span>
  </Item>
</template>

<script setup lang="ts">
import Item from "@manager/views/setting/setting-item.vue";
import { ElButton } from "element-plus";
import { useUpdateStore } from "@/stores/useUpdateStore";

const { status, downloadProgress } = storeToRefs(useUpdateStore());
const { checkUpdate } = useUpdateStore();
</script>

<style scoped lang="scss"></style>
