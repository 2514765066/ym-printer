<template>
  <section class="p-2 relative flex items-center gap-2">
    <span class="text-sm">共{{ selectedDoc.pageCount }}页</span>

    <NumberField
      class="absolute left-1/2 -translate-x-1/2"
      :step="0.1"
      :min="0.1"
      :max="2"
      :format-options="{
        style: 'percent',
      }"
      :model-value="scale * 0.01"
      @update:model-value="val => setScale(val * 100)"
    >
      <NumberFieldContent class="bg-transparent">
        <NumberFieldDecrement />

        <NumberFieldInput class="border-none ring-0!" />

        <NumberFieldIncrement />
      </NumberFieldContent>
    </NumberField>

    <Button class="ml-auto" variant="ghost" size="icon-sm" @click="toggleTheme">
      <MoonIcon v-if="theme == 'dark'" />

      <SunIcon v-else />
    </Button>
  </section>
</template>

<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { usePdfStore } from "@/stores/usePdfStore";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useDocStore } from "@/stores/useDocStore";

const { selectedDoc } = storeToRefs(useDocStore());
const { scale, theme } = storeToRefs(usePdfStore());
const { setScale, toggleTheme } = usePdfStore();
</script>

<style scoped lang="scss"></style>
