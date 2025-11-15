<template>
  <Item label="项目地址" icon="globe" sub="本软件的开源仓库地址">
    <ElButton text bg @click="handleClick">查看</ElButton>
  </Item>
</template>

<script setup lang="ts">
import Item from "@/components/setting-item/index.vue";
import { ElButton } from "element-plus";

const handleClick = () => {
  api.openUrl("https://github.com/2514765066/ym-printer");
};
</script>

<style scoped lang="scss"></style>
