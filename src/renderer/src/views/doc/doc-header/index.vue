<template>
  <component :is="map[status]" />
</template>

<script setup lang="ts">
import HeaderDefault from "./header-default.vue";
import HeaderPrice from "./header-price.vue";
import HeaderCheck from "./header-check.vue";
import { status } from "../index";

const map = {
  default: HeaderDefault,
  price: HeaderPrice,
  check: HeaderCheck,
};
</script>

<style scoped lang="scss"></style>
