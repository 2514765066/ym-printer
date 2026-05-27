<template>
  <section class="wh-full flex flex-col relative">
    <DocHeader class="p-1" v-if="hasDocs" />

    <DocEmpty v-if="!hasDocs" />

    <ElScrollbar class="flex-1" v-else>
      <DocContent />
    </ElScrollbar>
  </section>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import DocHeader from "./doc-header/index.vue";
import DocContent from "./doc-content/index.vue";
import DocEmpty from "./doc-empty.vue";
import { useDocStore } from "@/stores/useDocStore";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";

const { docs } = storeToRefs(useDocStore());
const { selectedWorkspaceID } = storeToRefs(useWorkspaceStore());

const hasDocs = computed(() =>
  docs.value.some(item => item.workspaceId == selectedWorkspaceID.value),
);
</script>

<style scoped lang="scss"></style>
