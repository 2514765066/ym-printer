<template>
  <FormField v-slot="{ componentField }" name="mode">
    <FormItem>
      <FormLabel>打印模式</FormLabel>

      <FormControl>
        <ToggleGroup
          class="w-full"
          variant="outline"
          type="single"
          v-bind="componentField"
        >
          <ToggleGroupItem
            class="flex-1"
            v-for="item in Object.keys(modeMap)"
            :key="item"
            :value="item"
          >
            {{ modeMap[item] }}
          </ToggleGroupItem>
        </ToggleGroup>
      </FormControl>

      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { modeMap } from "@/map";
</script>

<style scoped lang="scss"></style>
