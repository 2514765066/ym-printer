<template>
  <Item
    class="hover:bg-accent dark:hover:bg-accent/30 rounded-none"
    :class="{
      disabled: status == 'price',
    }"
    size="sm"
    @click="$emit('print', data.id)"
  >
    <ItemMedia variant="image">
      <FileIcon :size="38" :ext="data.ext" />
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

defineProps<{
  data: Doc;
}>();

defineEmits<{
  print: [id: string];
}>();
</script>

<style scoped lang="scss"></style>
