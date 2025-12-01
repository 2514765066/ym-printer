<template>
  <Group label="价格">
    <SimplexPrice v-model="config.simplexPrice" />

    <DuplexPrice v-model="config.duplexPrice" />
  </Group>
</template>

<script setup lang="ts">
import Group from "../setting-group.vue";
import SimplexPrice from "./simplex-price.vue";
import DuplexPrice from "./duplex-price.vue";
import { useConfigStore } from "@manager/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss"></style>
