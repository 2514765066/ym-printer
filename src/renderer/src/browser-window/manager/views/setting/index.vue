<template>
  <ElScrollbar class="settings" view-class="p-2 flex flex-col items-center">
    <Price />

    <General />

    <About />
  </ElScrollbar>
</template>

<script setup lang="ts">
import General from "./general/index.vue";
import Price from "./price/index.vue";
import About from "./about/index.vue";
import { ElScrollbar } from "element-plus";
</script>

<style scoped lang="scss"></style>
