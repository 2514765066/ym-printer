<template>
  <Item label="双面价格" icon="price" sub="打印双面打印的单价">
    <Number
      :step="0.05"
      :min="0"
      :max="999"
      :precision="2"
      suffix="元"
      v-model="model"
    />
  </Item>
</template>

<script setup lang="ts">
import Number from "@/components/ui/number.vue";
import Item from "@manager/views/setting/setting-item.vue";

const model = defineModel({
  required: true,
});
</script>

<style scoped lang="scss"></style>
