<template>
  <Item size="sm" variant="outline">
    <ItemMedia variant="image">
      <Spinner class="size-7 stroke-muted-foreground!" />
    </ItemMedia>

    <ItemContent>
      <ItemTitle>
        <span v-if="data.remark"> {{ data.remark }} | </span>

        {{ data.name }}
      </ItemTitle>

      <ItemDescription>
        {{ data.path }}
      </ItemDescription>
    </ItemContent>

    <ItemActions>
      <span class="text-muted-foreground">正在打印...</span>
    </ItemActions>
  </Item>
</template>

<script setup lang="ts">
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Doc } from "@type";
import { Spinner } from "@/components/ui/spinner";

const data = defineModel<Doc>({ required: true });
</script>

<style scoped lang="scss"></style>
