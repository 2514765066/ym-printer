<template>
  <Item
    class="hover:bg-accent dark:hover:bg-accent/30 has-aria-checked:bg-primary/15 has-aria-checked:hover:bg-primary/20! rounded-none"
    :class="{
      disabled,
    }"
    size="sm"
    as="label"
    :for="data.id"
  >
    <ItemMedia variant="image">
      <slot name="icon">
        <FileIcon :size="38" :ext="data.ext" />
      </slot>
    </ItemMedia>

    <ItemContent>
      <ItemTitle :title="data.name">
        <slot name="before-title">
          {{ data.name }}
        </slot>

        <slot name="title">
          {{ data.name }}
        </slot>
      </ItemTitle>

      <ItemDescription :title="data.path">
        <slot name="description">
          <ItemBaseDescription :data="data" />
        </slot>
      </ItemDescription>
    </ItemContent>

    <ItemActions>
      <slot name="actions"></slot>
    </ItemActions>
  </Item>
</template>

<script setup lang="ts">
import ItemBaseDescription from "./item-base-description.vue";
import FileIcon from "@/components/file-icon.vue";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemActions,
} from "@/components/ui/item";
import { Doc } from "@type";

defineProps<{
  data: Doc;
  disabled?: boolean;
}>();
</script>

<style scoped lang="scss"></style>
