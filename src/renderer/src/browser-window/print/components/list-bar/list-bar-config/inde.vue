<template>
  <Remark />

  <FinishBehavior />

  <Printer />

  <Count />

  <Mode />

  <Range />

  <Orientation />

  <Cardridge />

  <Dpi />
</template>

<script setup lang="ts">
import Remark from "./config-remark.vue";
import Mode from "./config-mode.vue";
import FinishBehavior from "./config-finish-behavior.vue";
import Range from "./config-range.vue";
import Orientation from "./config-orientation.vue";
import Printer from "./config-printer.vue";
import Count from "./config-count.vue";
import Cardridge from "./config-cardridge.vue";
import Dpi from "./config-dpi.vue";
</script>

<style scoped lang="scss"></style>
