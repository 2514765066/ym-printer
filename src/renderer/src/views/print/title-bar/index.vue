<template>
  <section class="title-bar flex items-center pl-2 gap-2">
    <Icon icon="print" size="20" />

    <span class="text-main text-sm">{{ selectedFile?.name }}</span>
  </section>
</template>

<script setup lang="ts">
import { useFileStore } from "@/stores/useFileStore";
import Icon from "@/components/icon/index.vue";

const { selectedFile } = storeToRefs(useFileStore());
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
