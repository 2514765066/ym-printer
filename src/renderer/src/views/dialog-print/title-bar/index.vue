<template>
  <section class="flex items-center px-3 gap-2">
    <FileIcon :ext="selectedDoc?.ext" size="24" />

    <span class="text-sm"> {{ selectedDoc?.name }}</span>
  </section>
</template>

<script setup lang="ts">
import FileIcon from "@/components/file-icon.vue";
import { useDocStore } from "@/stores/useDocStore";

const { selectedDoc } = storeToRefs(useDocStore());
</script>

<style scoped lang="scss"></style>
