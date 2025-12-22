<template>
  <Item label="单面价格" icon="price" sub="打印单面打印的单价">
    <Number
      :step="0.05"
      :precision="2"
      suffix="元"
      v-model="config.simplexPrice"
    />
  </Item>
</template>

<script setup lang="ts">
import Item from "@manager/views/setting/setting-item.vue";
import Number from "@/components/ui/number.vue";
import { useConfigStore } from "@manager/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss"></style>
