<template>
  <Item class="opacity-60" size="sm" variant="outline">
    <ItemMedia variant="image">
      <Spinner class="size-7 stroke-muted-foreground!" />
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

const data = defineModel<Doc>({ required: true });

onMounted(async () => {
  await ipcRenderer.invoke("parserDoc", toRaw(data.value));

  data.value.status = "init";
});
</script>

<style scoped lang="scss"></style>
