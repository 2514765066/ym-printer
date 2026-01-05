<template>
  <main class="home grid" ref="containerRef">
    <FileList />

    <ResizeHandle
      :containerRef="containerRef"
      :left-padding="200"
      :right-padding="400"
      v-model="fileListWidth"
    />

    <QueueList />
  </main>
</template>

<script setup lang="ts">
import ResizeHandle from "@/components/resize-handle.vue";
import FileList from "./file-list/index.vue";
import QueueList from "./queue-list/index.vue";
import { useStorage } from "@vueuse/core";

const fileListWidth = useStorage("file-list-width", 280);

const containerRef = useTemplateRef("containerRef");
</script>

<style scoped lang="scss">
.home {
  --file-list-width: calc(v-bind("fileListWidth") * 1px);

  grid-template-columns: var(--file-list-width) 0 calc(
      100% - var(--file-list-width)
    );

  grid-template-areas: "file handle finish-queue";
}
</style>
