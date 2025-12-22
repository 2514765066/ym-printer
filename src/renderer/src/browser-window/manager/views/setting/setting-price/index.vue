<template>
  <Group label="价格">
    <PriceSimplex />

    <PriceDuplex />
  </Group>
</template>

<script setup lang="ts">
import Group from "../setting-group.vue";
import PriceSimplex from "./price-simplex.vue";
import PriceDuplex from "./price-duplex.vue";
</script>

<style scoped lang="scss"></style>
