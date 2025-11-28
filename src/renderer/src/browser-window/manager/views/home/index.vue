<template>
  <main class="home grid">
    <FileList />

    <QueueList />
  </main>
</template>

<script setup lang="ts">
import FileList from "./file-list/index.vue";
import QueueList from "./queue-list/index.vue";
</script>

<style scoped lang="scss">
.home {
  grid-template-columns: 280px calc(100vw - 50px - 280px);

  grid-template-areas: "file finish-queue";
}
</style>
