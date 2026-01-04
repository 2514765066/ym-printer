<template>
  <ElFormItem label="备注" label-position="top">
    <ElInput
      v-model="config.remark"
      style="width: 100%"
      placeholder="当前打印任务的备注"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElInput, ElFormItem } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss"></style>
