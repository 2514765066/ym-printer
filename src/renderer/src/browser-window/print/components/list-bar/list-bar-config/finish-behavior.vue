<template>
  <ElFormItem label="打印完成后行为" label-position="top">
    <ElSelect v-model="model" placeholder="请选择打印机">
      <ElOption
        v-for="item in data"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElSelect, ElOption, ElFormItem } from "element-plus";

const data = [
  {
    label: "自动关闭",
    value: "close",
  },
  {
    label: "弹出提示",
    value: "tip",
  },
  {
    label: "不关闭",
    value: "not",
  },
];

const model = defineModel<string>();
</script>

<style scoped lang="scss"></style>
