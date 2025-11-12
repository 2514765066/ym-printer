<template>
  <div class="index grid">
    <NavBar />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/nav-bar/index.vue";
</script>

<style lang="scss">
.index {
  grid-area: "content";

  grid-template-columns: 50px calc(100vw - 50px);
  grid-template-areas: "nav-bar content";
}
</style>
