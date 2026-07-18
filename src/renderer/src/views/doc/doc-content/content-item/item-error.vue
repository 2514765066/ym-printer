<template>
  <ItemBase v-bind="$props" variant="destructive" :disabled="status == 'price'">
    <template #icon>
      <CircleXIcon class="size-7 text-destructive-foreground" />
    </template>

    <template #description>出错了！无法打开文档，请检查文档！</template>
  </ItemBase>
</template>

<script setup lang="ts">
import ItemBase from './item-base/index.vue';
import { Doc } from '@type';
import { CircleXIcon } from '@lucide/vue';
import { status } from '../../index';

defineProps<{
  data: Doc;
}>();
</script>

<style scoped lang="scss"></style>
