<template>
  <section class="menu-group flex flex-col p-1" v-if="!data.hidden">
    <div class="px-3 flex items-center" v-if="data.title">
      <span class="text-xs">{{ data.title }}</span>
    </div>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { MenuGrounp } from "../type";

defineProps<{
  data: MenuGrounp;
}>();
</script>

<style scoped lang="scss">
.menu-group {
  > div:first-child {
    height: 32px;

    > span {
      color: rgba(#fff, 0.443);
    }
  }
}

.menu-group:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.094);
}
</style>
