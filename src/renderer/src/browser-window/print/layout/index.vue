<template>
  <div class="print-window wh-screen grid bg-bg">
    <TitleBar />

    <ListBar />

    <ToolBar />

    <Content />
  </div>
</template>

<script setup lang="ts">
import TitleBar from "./title-bar/index.vue";
import ListBar from "./list-bar/index.vue";
import ToolBar from "./tool-bar/index.vue";
import Content from "./content/index.vue";
import { usePrintStore } from "../stores/usePrintStore";

usePrintStore();
</script>

<style lang="scss">
.print-window {
  grid-template-rows: 44px 50px calc(100vh - 44px - 50px);
  grid-template-columns: 260px calc(100vw - 260px);

  grid-template-areas:
    "title-bar title-bar"
    "list-bar tool-bar"
    "list-bar content";
}
</style>
