<template>
  <Item label="更新内容" icon="update" sub="查看软件当前版本更新的内容">
    <ElButton text bg @click="handleClick">查看</ElButton>
  </Item>
</template>

<script setup lang="ts">
import Item from "@/components/setting-item/index.vue";
import { ElButton } from "element-plus";

const handleClick = () => {
  api.openUrl(
    `https://gitee.com/yxingyus/ym-printer/blob/main/release-note.md`
  );
};
</script>

<style scoped lang="scss"></style>
