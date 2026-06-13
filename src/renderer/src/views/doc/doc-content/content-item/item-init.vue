<template>
  <ItemBase
    v-bind="$props"
    :disabled="status == 'price'"
    :disabled-check="status == 'price'"
    @click="handlePrint(data.id)"
  >
    <template #description>
      {{ data.path }}
    </template>
  </ItemBase>
</template>

<script setup lang="ts">
import ItemBase from "./item-base/index.vue";
import { Doc } from "@type";
import { status } from "../../index";

defineProps<{
  data: Doc;
}>();

const handlePrint: (id: string) => void = inject("handlePrint")!;
</script>

<style scoped lang="scss"></style>
