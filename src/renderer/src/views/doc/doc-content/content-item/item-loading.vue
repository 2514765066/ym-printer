<template>
  <ItemBase v-bind="$props" disabled :disabled-check="status == 'price'">
    <template #icon>
      <Spinner class="size-7 text-muted-foreground" />
    </template>

    <template #description>{{ data.path }}</template>
  </ItemBase>
</template>

<script setup lang="ts">
import ItemBase from './item-base/index.vue';
import { Spinner } from '@/components/ui/spinner';
import { Doc } from '@type';
import { status } from '../../index';

defineProps<{
  data: Doc;
}>();
</script>

<style scoped lang="scss"></style>
