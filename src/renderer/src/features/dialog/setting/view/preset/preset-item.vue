<template>
  <Item class="dark:hover:bg-accent/30" size="sm">
    <ItemContent>
      <ItemTitle>{{ data.name }}</ItemTitle>

      <ItemDescription> {{ data.value }}</ItemDescription>
    </ItemContent>

    <ItemActions>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon-sm">
            <MoreHorizontalIcon class="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent class="min-w-52">
          <DropdownMenuItem @click="handleEdit">
            <PencilLineIcon />

            <span>编辑 </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive" @click="handleRemove">
            <Trash2Icon />

            <span>删除 "当前预设"</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ItemActions>
  </Item>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
  ItemActions,
} from '@/components/ui/item';
import eventEmitter from '@/hooks/eventEmitter';
import { Preset, usePresetStore } from '@/stores/usePresetStore';
import { MoreHorizontalIcon, PencilLineIcon, Trash2Icon } from '@lucide/vue';

const { removePreset } = usePresetStore();

const props = defineProps<{
  data: Preset;
}>();

//编辑预设
const handleEdit = () => {
  eventEmitter.emit('dialog-preset:show', {
    type: 'edit',
    data: props.data,
  });
};

//删除预设
const handleRemove = () => {
  removePreset(props.data.id);

  eventEmitter.emit('success:show', `已删除 "${props.data.name}"`);
};
</script>

<style scoped lang="scss"></style>
