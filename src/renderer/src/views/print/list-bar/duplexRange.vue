<template>
  <ElFormItem label="双面打印范围" label-position="top" prop="duplexRange">
    <ElInput
      v-model="model"
      style="width: 100%"
      placeholder="1-3 或 1- 或 -3 或 -"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElInput, ElFormItem } from "element-plus";

const model = defineModel<string>();
</script>

<style scoped lang="scss"></style>
