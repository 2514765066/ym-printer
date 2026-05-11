<template>
  <section class="flex items-center px-2 gap-2 bg-sidebar border-b">
    <FileIcon :ext="selectedDoc?.ext" size="24" />

    <span class="text-main text-sm"> {{ selectedDoc?.name }}</span>
  </section>
</template>

<script setup lang="ts">
import FileIcon from "@/components/file-icon.vue";
import { useDocStore } from "@/stores/useDocStore";

const { selectedDoc } = storeToRefs(useDocStore());
</script>

<style scoped lang="scss"></style>
