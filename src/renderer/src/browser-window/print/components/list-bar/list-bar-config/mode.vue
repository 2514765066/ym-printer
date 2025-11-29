<template>
  <ElFormItem label="打印模式" label-position="top">
    <ElRadioGroup v-model="config.mode">
      <ElTooltip content="全部单面打印" :hide-after="0">
        <ElRadio value="simplex">单打</ElRadio>
      </ElTooltip>

      <ElTooltip content="全部双面打印" :hide-after="0">
        <ElRadio value="duplex">双打</ElRadio>
      </ElTooltip>

      <ElTooltip content="单独数字单面打印，范围双面打印" :hide-after="0">
        <ElRadio value="mix">混合</ElRadio>
      </ElTooltip>
    </ElRadioGroup>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem, ElRadio, ElRadioGroup, ElTooltip } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss"></style>
