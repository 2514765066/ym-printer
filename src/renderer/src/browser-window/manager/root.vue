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
