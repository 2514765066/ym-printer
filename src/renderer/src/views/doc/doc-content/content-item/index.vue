<template>
  <component :is="map[data.status]" :data="data" />
</template>

<script setup lang="ts">
import ItemInit from "./item-init.vue";
import ItemPrinting from "./item-printing.vue";
import ItemPrinted from "./item-printed.vue";
import ItemPrepare from "./item-prepare.vue";
import ItemError from "./item-error.vue";
import ItemLoading from "./item-loading.vue";
import { Doc } from "@type";

defineProps<{
  data: Doc;
}>();

const map = {
  loading: ItemLoading,
  init: ItemInit,
  prepare: ItemPrepare,
  upload: ItemPrinting,
  printing: ItemPrinting,
  printed: ItemPrinted,
  error: ItemError,
};
</script>

<style scoped lang="scss"></style>
