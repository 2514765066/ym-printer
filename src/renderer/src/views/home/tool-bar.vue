<template>
  <section class="tool-bar"></section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.tool-bar {
  height: 50px;

  border-bottom: 1px solid var(--border-color);

  button {
    transition: background-color 0.1s;

    &:hover {
      background-color: var(--hover-bg-color);
    }
  }
}
</style>
