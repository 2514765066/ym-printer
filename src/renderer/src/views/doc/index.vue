<template>
  <section class="wh-full flex flex-col relative">
    <DocHeader class="p-1 z-10" />

    <div
      class="wh-full absolute left-50 top-50 -translate-x-50 -translate-y-50"
      v-if="!hasDocs"
    >
      <DocEmpty />
    </div>

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
