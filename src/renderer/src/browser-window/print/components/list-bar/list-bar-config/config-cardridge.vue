<template>
  <ElFormItem label="墨盒" label-position="top" :rules="rule" prop="cartridge">
    <ElSelect v-model="config.cartridge" placeholder="请选择墨盒颜色">
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
    label: "黑白",
    value: "black",
  },
  {
    label: "彩色",
    value: "color",
  },
];

const rule: FormItemRule = {
  required: true,
  message: "请选择墨盒",
};
</script>

<style scoped lang="scss"></style>
