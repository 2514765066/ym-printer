<template>
  <Item label="单面价格" icon="price" sub="打印单面打印的单价">
    <Number :step="0.05" :precision="2" suffix="元" v-model="model" />
  </Item>
</template>

<script setup lang="ts">
import Item from "@manager/views/setting/setting-item.vue";
import Number from "@/components/ui/number.vue";

const model = defineModel({
  required: true,
});
</script>

<style scoped lang="scss"></style>
