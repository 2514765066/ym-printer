<template>
  <Group label="价格">
    <PriceSimplex v-model="config.simplexPrice" />

    <PriceDuplex v-model="config.duplexPrice" />
  </Group>
</template>

<script setup lang="ts">
import Group from "../setting-group.vue";
import PriceSimplex from "./price-simplex.vue";
import PriceDuplex from "./price-duplex.vue";
import { useConfigStore } from "@manager/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss"></style>
