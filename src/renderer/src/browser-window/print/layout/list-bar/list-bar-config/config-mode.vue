<template>
  <ElFormItem label="打印模式" label-position="top">
    <ElSegmented class="w-full" :options="options" v-model="config.mode">
      <template #default="{ item }">
        <Tooltip :label="item.tip">
          <div class="wh-full">
            <span>{{ item.label }}</span>
          </div>
        </Tooltip>
      </template>
    </ElSegmented>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem, ElSegmented } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";
import Tooltip from "@/components/ui/tooltip.vue";

const { config } = storeToRefs(useConfigStore());

const options = [
  {
    label: "单打",
    value: "simplex",
    tip: "全部单面打印",
  },
  {
    label: "双打",
    value: "duplex",
    tip: "全部双面打印",
  },
  {
    label: "混合",
    value: "mix",
    tip: "单独数字单面打印，范围双面打印",
  },
];
</script>

<style scoped lang="scss">
.el-segmented {
  --el-segmented-bg-color: transparent;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset;
}
</style>
