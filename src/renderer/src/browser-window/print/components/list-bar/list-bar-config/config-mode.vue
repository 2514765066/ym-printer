<template>
  <ElFormItem label="打印模式" label-position="top">
    <ElRadioGroup v-model="config.mode">
      <Tooltip label="全部单面打印" placement="top">
        <ElRadio value="simplex">单打</ElRadio>
      </Tooltip>

      <Tooltip label="全部双面打印" placement="top">
        <ElRadio value="duplex">双打</ElRadio>
      </Tooltip>

      <Tooltip label="单独数字单面打印，范围双面打印" placement="top">
        <ElRadio value="mix">混合</ElRadio>
      </Tooltip>
    </ElRadioGroup>
  </ElFormItem>
</template>

<script setup lang="ts">
import Tooltip from "@/components/ui/tooltip.vue";
import { ElFormItem, ElRadio, ElRadioGroup } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss"></style>
