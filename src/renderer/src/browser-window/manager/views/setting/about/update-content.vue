<template>
  <Item label="更新内容" icon="update" sub="查看软件当前版本更新的内容">
    <ElButton text bg @click="handleClick">查看</ElButton>
  </Item>
</template>

<script setup lang="ts">
import { useConfigStore } from "@manager/stores/useConfigStore";
import Item from "@manager/views/setting/setting-item.vue";
import { ElButton } from "element-plus";

const { config } = storeToRefs(useConfigStore());

const handleClick = () => {
  api.openUrl(`${config.value.selectedRepo.url}/blob/main/release-note.md`);
};
</script>

<style scoped lang="scss"></style>
