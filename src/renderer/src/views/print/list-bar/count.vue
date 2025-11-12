<template>
  <ElFormItem label="总份数" label-position="top" prop="copies">
    <ElInputNumber v-model="model" :min="1" style="width: 100%" />
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElInputNumber, ElFormItem } from "element-plus";

const model = defineModel<number>();
</script>

<style scoped lang="scss"></style>
