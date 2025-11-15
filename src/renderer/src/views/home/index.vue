<template>
  <main class="home grid">
    <File />

    <Queue />

    <FinishQueue />
  </main>
</template>

<script setup lang="ts">
import File from "./file.vue";
import Queue from "./queue.vue";
import FinishQueue from "./finish-queue.vue";
</script>

<style scoped lang="scss">
.home {
  grid-template-columns: 280px calc(100vw - 50px - 280px);
  grid-template-rows: repeat(2, calc((100vh - 44px) / 2));

  grid-template-areas:
    "file queue"
    "file finish-queue";
}
</style>
