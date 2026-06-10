<template>
  <ItemBase v-bind="$props" @click="handlePrint(data.id)">
    <template #icon v-if="status == 'price'">
      <Checkbox
        :id="data.id"
        :model-value="checked.has(data.id)"
        @update:model-value="toggleCheck(data.id)"
      />
    </template>

    <template #before-title v-if="data.remark">
      <span> {{ data.remark }}</span>

      <span class="mx-1 text-muted-foreground"> | </span>
    </template>

    <template #actions>
      <CheckIcon class="size-6 text-green-500" />
    </template>
  </ItemBase>
</template>

<script setup lang="ts">
import ItemBase from "./item-base/index.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { Doc } from "@type";
import { status } from "../../index";
import { checked, toggleCheck } from "../../check";
import { CheckIcon } from "lucide-vue-next";

defineProps<{
  data: Doc;
}>();

const handlePrint: (id: string) => void = inject("handlePrint")!;
</script>

<style scoped lang="scss"></style>
