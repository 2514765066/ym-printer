<template>
  <footer class="h-7 px-3 flex items-center gap-4 border-t" v-if="docs.length">
    <span class="text-xs">文档: {{ docs.length }} </span>

    <span class="text-xs">完成: {{ finishCount }} </span>
  </footer>
</template>

<script setup lang="ts">
import { useDocStore } from "@/stores/useDocStore";

const { docs } = storeToRefs(useDocStore());

const finishCount = computed(() => {
  return docs.value.reduce((previousValue, currentValue) => {
    if (currentValue.status == "printed") {
      previousValue++;
    }

    return previousValue;
  }, 0);
});
</script>

<style scoped lang="scss"></style>
