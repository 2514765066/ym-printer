<template>
  <Tooltip :disabled="disabled">
    <TooltipTrigger as-child>
      <slot></slot>
    </TooltipTrigger>

    <TooltipContent :side="side">
      <p>{{ label }}</p>
    </TooltipContent>
  </Tooltip>
</template>

<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

defineProps<{
  label: string;
  side?: "right" | "left" | "top" | "bottom";
  disabled?: boolean;
}>();
</script>
