<template>
  <section class="nav-bar p-1.5 flex flex-col gap-1.5">
    <Item label="主页" to="/home" icon="home" />

    <div class="mt-auto">
      <Item label="设置" to="/settings" icon="settings" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Item from "./item.vue";
</script>

<style scoped lang="scss">
.nav-bar {
  grid-area: nav-bar;

  border-right: 1px solid var(--border-color);
}
</style>
