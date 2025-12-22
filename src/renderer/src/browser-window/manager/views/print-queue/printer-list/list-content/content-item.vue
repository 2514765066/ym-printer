<template>
  <Tooltip :label="label" placement="right">
    <section
      class="p-2 flex items-center gap-2 rounded-md hover:bg-hover transition-colors cursor-pointer"
      :class="`${active && 'bg-hover'}`"
      @click="emits('click')"
    >
      <Icon icon="print" size="24" />

      <div class="flex flex-col gap-0.5 overflow-hidden">
        <span class="text-sm text-main ellipsis">
          {{ label }}
        </span>
      </div>
    </section>
  </Tooltip>
</template>

<script setup lang="ts">
import { Icon } from "@/components/ui/icon";
import Tooltip from "@/components/ui/tooltip.vue";

defineProps<{
  label: string;
  active?: boolean;
}>();

const emits = defineEmits<{
  click: [];
}>();
</script>

<style scoped lang="scss"></style>
