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
        <FileIcon
          :size="38"
          :ext="data.ext"
          v-if="disabledCheck || status == 'default'"
        />

        <Checkbox
          :id="data.id"
          :model-value="checked.has(data.id)"
          @update:model-value="toggleCheck(data.id)"
          v-else
        />
      </slot>
    </ItemMedia>

    <ItemContent>
      <ItemTitle
        :title="data.name"
        :class="{
          'text-destructive-foreground': variant == 'destructive',
        }"
      >
        <slot name="before-title">
          {{ data.name }}
        </slot>

        <slot name="title">
          {{ data.name }}
        </slot>
      </ItemTitle>

      <ItemDescription
        :class="{
          'text-destructive-foreground/80': variant == 'destructive',
        }"
      >
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { checked, toggleCheck } from "@/views/doc/check";
import { status } from "@/views/doc/index.js";

defineProps<{
  data: Doc;
  disabled?: boolean;
  variant?: "destructive";
  disabledCheck?: boolean;
}>();
</script>

<style scoped lang="scss"></style>
