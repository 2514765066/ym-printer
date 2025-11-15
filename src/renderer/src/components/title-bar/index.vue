<template>
  <section class="title-bar flex items-center pl-1.5 gap-2">
    <div class="w-9 h-9 flex-center">
      <img src="@/assets/icon.png" width="20" />
    </div>

    <span class="text-main text-sm">{{ name }}</span>
  </section>
</template>

<script setup lang="ts">
import { name } from "@/service/info";
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 148px;

  border-bottom: 1px solid var(--border-color);

  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }
}
</style>
