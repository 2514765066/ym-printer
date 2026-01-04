<template>
  <section class="nav-bar p-1.5 flex flex-col gap-1.5 border-r border-border">
    <Item label="主页" to="/manager/home" icon="home" />

    <Item label="打印机队列" to="/manager/print-queue" icon="queues" />

    <div class="mt-auto">
      <Item label="设置" to="/manager/settings" icon="settings" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Item from "./nav-bar-item.vue";
</script>

<style scoped lang="scss">
.nav-bar {
  grid-area: nav-bar;
}
</style>
