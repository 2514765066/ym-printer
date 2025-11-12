<template>
  <div class="app wh-screen grid">
    <TitleBar />

    <RouterView v-slot="{ Component }">
      <KeepAlive :include="['Print']">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
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

  grid-template-rows: 44px calc(100vh - 44px);

  grid-template-areas:
    "title-bar"
    "content";
}
</style>
