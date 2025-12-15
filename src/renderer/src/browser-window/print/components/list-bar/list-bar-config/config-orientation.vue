<template>
  <ElFormItem
    label="方向"
    label-position="top"
    :rules="rule"
    prop="orientation"
  >
    <ElSelect v-model="config.orientation">
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
    label: "纵向",
    value: "portrait",
  },
  {
    label: "横向",
    value: "landscape",
  },
];

const rule: FormItemRule = {
  required: true,
  message: "请选择方向",
};
</script>

<style scoped lang="scss"></style>
