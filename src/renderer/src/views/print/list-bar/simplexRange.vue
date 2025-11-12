<template>
  <ElFormItem label="单面打印范围" label-position="top" prop="simplexRange">
    <ElInput
      v-model="model"
      style="width: 100%"
      placeholder="1或1-3 或 1- 或 -3 或 -"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElInput, ElFormItem } from "element-plus";

const model = defineModel<string>();
</script>

<style scoped lang="scss"></style>
