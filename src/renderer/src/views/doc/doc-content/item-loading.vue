<template>
  <Item class="opacity-60" size="sm">
    <ItemMedia variant="image">
      <Spinner class="size-7 text-muted-foreground" />
    </ItemMedia>

    <ItemContent>
      <ItemTitle> {{ data.name }}</ItemTitle>

      <ItemDescription>
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
import { Spinner } from "@/components/ui/spinner";
import { Doc } from "@type";

defineProps<{
  data: Doc;
}>();
</script>

<style scoped lang="scss"></style>
