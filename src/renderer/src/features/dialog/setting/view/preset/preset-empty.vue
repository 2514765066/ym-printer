<template>
  <Empty class="wh-full">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FilesIcon />
      </EmptyMedia>

      <EmptyTitle>暂无打印范围预设</EmptyTitle>

      <EmptyDescription>
        你还没有新建任何预设，请开始新增你的预设. <br />
      </EmptyDescription>
    </EmptyHeader>

    <EmptyContent>
      <Button @click="handleAdd">
        <PlusIcon />

        <span>新建预设</span>
      </Button>
    </EmptyContent>
  </Empty>
</template>

<script setup lang="ts">
import { FilesIcon, PlusIcon } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import eventEmitter from '@/hooks/eventEmitter';

const handleAdd = () => {
  eventEmitter.emit('dialog-preset:show', {
    type: 'add',
  });
};
</script>
