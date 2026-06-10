<template>
  <ItemBase v-bind="$props" disabled>
    <template #icon>
      <Spinner class="size-7 text-muted-foreground" />
    </template>

    <template #description>{{ data.path }}</template>
  </ItemBase>
</template>

<script setup lang="ts">
import ItemBase from "./item-base/index.vue";
import { Spinner } from "@/components/ui/spinner";
import { Doc } from "@type";

defineProps<{
  data: Doc;
}>();
</script>

<style scoped lang="scss"></style>
