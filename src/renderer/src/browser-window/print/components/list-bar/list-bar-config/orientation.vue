<template>
  <ElFormItem label="方向" label-position="top">
    <ElSelect v-model="model">
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
    label: "纵向",
    value: "portrait",
  },
  {
    label: "横向",
    value: "landscape",
  },
];

const model = defineModel<"portrait" | "landscape">();
</script>

<style scoped lang="scss"></style>
