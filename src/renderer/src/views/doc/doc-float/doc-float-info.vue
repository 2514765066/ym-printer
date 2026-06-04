<template>
  <Button class="absolute bottom-1 left-1" variant="ghost" size="sm">
    <span class="text-xs">
      打印完成文档: {{ finishCount }} / {{ docs.length }}
    </span>
  </Button>
</template>

<script setup lang="ts">
import { useDocStore } from "@/stores/useDocStore";
import { Button } from "@/components/ui/button";

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
