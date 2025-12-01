<template>
  <Item label="项目地址" icon="globe" sub="本软件的开源仓库地址">
    <ElButton text bg @click="handleClick">查看</ElButton>
  </Item>
</template>

<script setup lang="ts">
import { useConfigStore } from "@manager/stores/useConfigStore";
import Item from "@manager/views/setting/setting-item.vue";
import { ElButton } from "element-plus";

const { config } = storeToRefs(useConfigStore());

const handleClick = () => {
  api.openUrl(config.value.selectedRepo.url);
};
</script>

<style scoped lang="scss"></style>
