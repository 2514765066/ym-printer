<template>
  <ElFormItem label="总份数" label-position="top">
    <ElInputNumber
      v-model="config.count"
      :min="1"
      :value-on-clear="0"
      style="width: 100%"
    />
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElInputNumber, ElFormItem } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss"></style>
