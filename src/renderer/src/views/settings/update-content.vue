<template>
  <Item label="更新内容" icon="update" sub="查看软件当前版本更新的内容">
    <ElButton text bg @click="handleClick">查看</ElButton>
  </Item>
</template>

<script setup lang="ts">
import Item from "@/components/setting-item/index.vue";
import { version } from "@/service/info";
import { ElButton } from "element-plus";

const handleClick = () => {
  api.openUrl(
    `https://github.com/2514765066/ym-printer/releases/tag/v${version}`
  );
};
</script>

<style scoped lang="scss"></style>
