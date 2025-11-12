<template>
  <section class="title-bar flex items-center pl-2 gap-2">
    <Icon icon="print" size="20" />
    <span class="text-main text-sm">{{ name }}</span>
  </section>
</template>

<script setup lang="ts">
import { name } from "@/service/info";
import Icon from "../icon/index.vue";
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 148px;

  border-bottom: 1px solid var(--border-color);

  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }
}
</style>
