<template>
  <HeaderDefault v-if="status == 'default'" />

  <HeaderPrice v-else-if="status == 'price'" />
</template>

<script setup lang="ts">
import HeaderDefault from "./header-default.vue";
import HeaderPrice from "./header-price.vue";
import { status } from "../index";
</script>

<style scoped lang="scss"></style>
