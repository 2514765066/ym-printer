<template>
  <ElInputNumber
    class="number"
    :step="step"
    :min="min"
    :max="max"
    :precision="precision"
    v-model="model"
    :value-on-clear="0"
  >
    <template #decrease-icon>
      <Button square>
        <Icon icon="subtract" size="18" />
      </Button>
    </template>

    <template #suffix>元</template>

    <template #increase-icon>
      <Button square>
        <Icon icon="add" size="18" />
      </Button>
    </template>
  </ElInputNumber>
</template>

<script setup lang="ts">
import { Icon } from "@/components/ui/icon";
import { ElInputNumber } from "element-plus";
import Button from "./button.vue";

withDefaults(
  defineProps<{
    step?: number;
    min?: number;
    max?: number;
    precision?: number;
  }>(),
  {
    min: 0,
    max: 999,
  }
);

const model = defineModel<number>({
  required: true,
});
</script>

<style scoped lang="scss">
.number {
  &:deep(.el-input__wrapper) {
    box-shadow: unset !important;
  }

  &:deep(.el-input-number__decrease) {
    border: unset !important;
  }

  &:deep(.el-input-number__increase) {
    border: unset !important;
  }
}
</style>
