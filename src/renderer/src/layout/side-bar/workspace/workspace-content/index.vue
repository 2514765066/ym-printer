<template>
  <ElScrollbar view-class="px-2 ">
    <VueDraggable
      class="flex flex-col gap-1"
      :animation="200"
      v-model="workspace"
    >
      <Item v-for="item in workspace" :key="item.id" :data="item" />
    </VueDraggable>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import Item from "./item.vue";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { VueDraggable } from "vue-draggable-plus";

const { workspace } = storeToRefs(useWorkspaceStore());
</script>

<style scoped lang="scss"></style>
