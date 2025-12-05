<template>
  <div class="manager-window wh-screen grid">
    <TitleBar />

    <NavBar />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@manager/components/nav-bar/index.vue";
import TitleBar from "@manager/components/title-bar/index.vue";
import { useUpdateStore } from "./stores/useUpdateStore";

//修复进入必须进入设置界面才会检查更新的bug
useUpdateStore();
</script>

<style lang="scss">
.manager-window {
  background-color: var(--bg-color);

  grid-template-columns: 50px calc(100vw - 50px);
  grid-template-rows: 44px calc(100vh - 44px);

  grid-template-areas:
    "title-bar title-bar"
    "nav-bar content";
}
</style>
