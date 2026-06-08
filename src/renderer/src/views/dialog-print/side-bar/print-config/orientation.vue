<template>
  <FormField v-slot="{ componentField }" name="orientation">
    <FormItem>
      <FormLabel>方向</FormLabel>

      <FormControl>
        <ToggleGroup
          class="w-full shadow-xs"
          variant="outline"
          type="single"
          v-bind="componentField"
        >
          <ToggleGroupItem
            class="flex-1"
            v-for="item in Object.keys(orientationMap)"
            :key="item"
            :value="item"
          >
            {{ orientationMap[item] }}
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
import { orientationMap } from "@/map";
</script>

<style scoped lang="scss"></style>
