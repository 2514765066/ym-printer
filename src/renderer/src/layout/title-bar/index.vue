<template>
  <section class="title-bar px-1 flex items-center"></section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 148px;

  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }
}
</style>
