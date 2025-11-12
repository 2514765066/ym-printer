<template>
  <ElFormItem label="备注" label-position="top" prop="remarks">
    <ElInput
      v-model="model"
      style="width: 100%"
      placeholder="再打印队列中的备注名称"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElInput, ElFormItem } from "element-plus";

const model = defineModel<string>();
</script>

<style scoped lang="scss"></style>
