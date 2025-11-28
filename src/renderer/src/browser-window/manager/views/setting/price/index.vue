<template>
  <Group label="价格">
    <SimplexPrice v-model="data.simplexPrice" />

    <DuplexPrice v-model="data.duplexPrice" />
  </Group>
</template>

<script setup lang="ts">
import Group from "../setting-group.vue";
import SimplexPrice from "./simplex-price.vue";
import DuplexPrice from "./duplex-price.vue";
import { useSettingsStore } from "@manager/stores/useSettingsStore";

const { data } = storeToRefs(useSettingsStore());
</script>

<style scoped lang="scss"></style>
