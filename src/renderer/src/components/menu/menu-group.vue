<template>
  <section class="menu-group p-1 flex flex-col" v-if="!data.hidden">
    <div class="h-8 px-3 flex items-center" v-if="data.label">
      <span class="text-xs text-sub">{{ data.label }}</span>
    </div>

    <Item v-for="(item, index) of data.children" :key="index" :data="item" />
  </section>
</template>

<script setup lang="ts">
import Item from "./menu-group-item.vue";
import { MenuGroup } from "./index";

defineProps<{
  data: MenuGroup;
}>();
</script>

<style scoped lang="scss">
.menu-group {
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.094);
  }
}
</style>
