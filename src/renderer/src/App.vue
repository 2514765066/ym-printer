<template>
  <div class="app wh-screen grid">
    <TitleBar />

    <NavBar />

    <RouterView />
  </div>

  <Print />
</template>

<script setup lang="ts">
import Print from "@/views/print/index.vue";
import NavBar from "@/components/nav-bar/index.vue";
import TitleBar from "@/components/title-bar/index.vue";
import eventEmitter from "./hooks/eventEmitter";
import { ElMessage } from "element-plus";

eventEmitter.on("success:show", (message: string) => {
  ElMessage({
    message,
    type: "success",
    duration: 1000,
  });
});
</script>

<style lang="scss">
.app {
  background-color: var(--bg-color);

  grid-template-columns: 50px calc(100vw - 50px);
  grid-template-rows: 44px calc(100vh - 44px);

  grid-template-areas:
    "title-bar title-bar"
    "nav-bar content";
}
</style>
