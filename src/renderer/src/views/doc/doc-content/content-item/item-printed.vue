<template>
  <ItemBase v-bind="$props" @click="handlePrint(data.id)">
    <template #before-title v-if="data.remark">
      <span> {{ data.remark }}</span>

      <span class="mx-1 text-muted-foreground"> | </span>
    </template>

    <template #actions>
      <CheckIcon class="size-6 text-green-500" />
    </template>
  </ItemBase>
</template>

<script setup lang="ts">
import ItemBase from "./item-base/index.vue";
import { Doc } from "@type";
import { CheckIcon } from "lucide-vue-next";

defineProps<{
  data: Doc;
}>();

const handlePrint: (id: string) => void = inject("handlePrint")!;
</script>

<style scoped lang="scss"></style>
