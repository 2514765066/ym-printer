<template>
  <main class="print-drawer grid">
    <ListBar />

    <ToolBar />

    <Content />
  </main>
</template>

<script setup lang="ts">
import Content from "./content/index.vue";
import ListBar from "./list-bar/index.vue";
import ToolBar from "./tool-bar/index.vue";

defineOptions({
  name: "Print",
});
</script>

<style scoped lang="scss">
.print-drawer {
  grid-template-columns: 260px calc(100vw - 260px);
  grid-template-rows: 44px calc(100vh - 44px - 44px);

  grid-template-areas:
    "list-bar tool-bar"
    "list-bar content";
}
</style>
