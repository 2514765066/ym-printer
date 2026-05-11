<template>
  <Item
    class="dark:hover:bg-accent/30"
    :class="{ 'pointer-events-none opacity-60': status == 'price' }"
    size="sm"
    variant="outline"
    @click="$emit('print', data.id)"
  >
    <ItemMedia variant="image">
      <FileIcon :size="36" :ext="data.ext" />
    </ItemMedia>

    <ItemContent>
      <ItemTitle :title="data.name">
        {{ data.name }}
      </ItemTitle>

      <ItemDescription :title="data.path">
        {{ data.path }}
      </ItemDescription>
    </ItemContent>
  </Item>
</template>

<script setup lang="ts">
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import FileIcon from "@/components/file-icon.vue";
import { Doc } from "@type";
import { status } from "..";

defineEmits<{
  print: [id: string];
}>();

const data = defineModel<Doc>({ required: true });
</script>

<style scoped lang="scss"></style>
