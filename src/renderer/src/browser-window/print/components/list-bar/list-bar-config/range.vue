<template>
  <ElFormItem
    label="打印范围"
    label-position="top"
    prop="range"
    label-width="200px"
  >
    <ElTooltip trigger="focus" :hide-after="0">
      <ElInput
        v-model="model"
        style="width: 100%"
        placeholder="格式 1,1-,-10,-"
      />

      <template #content>
        单打格式：单独的数字<strong>1,2</strong><br />
        双打格式：必须是范围<strong>1-10</strong><br />
        <strong>-</strong>表示从开始到结束的范围<br />
        <strong>2-</strong>:表示从2开始到结束的范围<br />
        <strong>-10</strong>:表示从1开始到10的范围
      </template>
    </ElTooltip>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElInput, ElFormItem, ElTooltip } from "element-plus";

const model = defineModel<string>();
</script>

<style scoped lang="scss"></style>
