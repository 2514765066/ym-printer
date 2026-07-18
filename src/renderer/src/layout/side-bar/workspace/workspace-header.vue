<template>
  <section class="pl-3 pr-2 flex items-center">
    <span class="text-xs text-muted-foreground">工作空间</span>

    <Tooltip label="新建工作空间 Ctrl+N">
      <Button class="ml-auto" variant="outline" size="xs" @click="handleAdd">
        <PlusIcon class="size-4" />

        新空间
      </Button>
    </Tooltip>
  </section>
</template>

<script setup lang="ts">
import Tooltip from '@/components/tooltip.vue';
import { Button } from '@/components/ui/button';
import eventEmitter from '@/hooks/eventEmitter';
import { PlusIcon } from '@lucide/vue';

const handleAdd = () => {
  eventEmitter.emit('dialog-workspace:show', {
    type: 'add',
  });
};
</script>

<style scoped lang="scss"></style>
