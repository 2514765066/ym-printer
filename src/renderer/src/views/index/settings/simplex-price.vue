<template>
  <Item label="单面价格" icon="price" sub="打印单面打印的单价">
    <div class="flex items-center gap-4">
      <ElInputNumber
        :step="0.05"
        :min="0"
        :precision="2"
        v-model="model"
        :value-on-clear="0"
        class="ym-input-number"
      >
        <template #decrease-icon>
          <ElButton text bg class="aspect-square" style="width: 32px">
            <Icon icon="subtract" size="18" />
          </ElButton>
        </template>

        <template #suffix>元</template>

        <template #increase-icon>
          <ElButton text bg class="aspect-square" style="width: 32px">
            <Icon icon="add" size="18" />
          </ElButton>
        </template>
      </ElInputNumber>
    </div>
  </Item>
</template>

<script setup lang="ts">
import Item from "@/components/setting-item/index.vue";
import Icon from "@/components/icon/index.vue";
import { ElButton, ElInputNumber } from "element-plus";

const model = defineModel<number>({ required: true });
</script>

<style scoped lang="scss"></style>
