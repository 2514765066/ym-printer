<template>
  <FormField v-slot="{ componentField }" name="cartridge">
    <FormItem>
      <FormLabel>墨盒颜色</FormLabel>

      <FormControl>
        <ToggleGroup
          class="w-full shadow-xs"
          variant="outline"
          type="single"
          v-bind="componentField"
        >
          <ToggleGroupItem
            class="flex-1"
            v-for="item in Object.keys(cartridgeMap)"
            :key="item"
            :value="item"
          >
            {{ cartridgeMap[item] }}
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
import { cartridgeMap } from "@/map";
</script>

<style scoped lang="scss"></style>
