<template>
  <Item class="hover:bg-accent dark:hover:bg-accent/30 rounded-none" size="sm">
    <ItemMedia variant="image">
      <CircleXIcon class="size-7 text-destructive-foreground" />
    </ItemMedia>

    <ItemContent>
      <ItemTitle :title="data.name" class="text-destructive-foreground">
        {{ data.name }}
      </ItemTitle>

      <ItemDescription
        :title="data.path"
        class="text-destructive-foreground/70"
      >
        出错了！无法打开文档，请检查文档！
      </ItemDescription>
    </ItemContent>

    <ItemActions>
      <Button variant="destructive" size="sm" @click="handleRemove">
        <Trash2Icon />

        <span>删除</span>
      </Button>
    </ItemActions>
  </Item>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemActions,
} from "@/components/ui/item";
import eventEmitter from "@/hooks/eventEmitter";
import { useDocStore } from "@/stores/useDocStore";
import { Doc } from "@type";
import { CircleXIcon, Trash2Icon } from "lucide-vue-next";

const { removeDoc } = useDocStore();

const props = defineProps<{
  data: Doc;
}>();

const handleRemove = () => {
  removeDoc(props.data.id);

  eventEmitter.emit("success:show", `已删除 ${props.data.name}`);
};
</script>

<style scoped lang="scss"></style>
