<template>
  <Teleport to="body">
    <div
      class="flex-center fixed inset-0"
      style="background-color: rgba(0, 0, 0, 0.5)"
      v-if="visible"
    >
      <Loading />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { Loading, visible } from "./index";
</script>

<style scoped lang="scss"></style>
