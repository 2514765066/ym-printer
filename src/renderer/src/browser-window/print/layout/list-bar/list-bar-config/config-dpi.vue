<template>
  <ElFormItem label="质量" label-position="top" :rules="rule" prop="cartridge">
    <ElSelect v-model="config.dpi" placeholder="请选择质量">
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
import { ElSelect, ElOption, ElFormItem, FormItemRule } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());

const data = [
  {
    label: "150 dpi",
    value: 150,
  },
  {
    label: "300 dpi",
    value: 300,
  },
  {
    label: "600 dpi",
    value: 600,
  },
  {
    label: "1200 dpi",
    value: 1200,
  },
];

const rule: FormItemRule = {
  required: true,
  message: "请选择质量",
};
</script>

<style scoped lang="scss"></style>
