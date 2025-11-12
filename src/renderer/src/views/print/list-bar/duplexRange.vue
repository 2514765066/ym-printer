<template>
  <ElFormItem label="双面打印范围" label-position="top" prop="duplexRange">
    <ElInput
      v-model="model"
      style="width: 100%"
      placeholder="格式 1,1-,-10,-"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElInput, ElFormItem } from "element-plus";

const model = defineModel<string>();
</script>

<style scoped lang="scss"></style>
