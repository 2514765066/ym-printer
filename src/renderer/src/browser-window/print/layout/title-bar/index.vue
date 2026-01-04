<template>
  <section
    class="title-bar flex items-center px-2 gap-2 border-b border-border"
  >
    <FileIcon :ext="file.ext" size="24" />

    <span class="text-main text-sm"> {{ config.remark || file.name }}</span>
  </section>
</template>

<script setup lang="ts">
import FileIcon from "@/components/file-icon.vue";
import { useFileStore } from "@print/stores/useFileStore";
import { useConfigStore } from "@print/stores/useConfigStore";

const { file } = storeToRefs(useFileStore());
const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 148px;

  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }
}
</style>
