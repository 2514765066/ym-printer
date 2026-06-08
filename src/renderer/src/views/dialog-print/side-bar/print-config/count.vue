<template>
  <FormField v-slot="{ componentField }" name="count">
    <FormItem>
      <FormLabel>打印份数</FormLabel>

      <FormControl>
        <NumberField
          class="w-full"
          :default-value="1"
          :min="1"
          :max="999"
          v-bind="componentField"
        >
          <NumberFieldContent class="bg-transparent!">
            <NumberFieldDecrement />
            <NumberFieldInput class="shadow-xs" />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
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
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
</script>

<style scoped lang="scss"></style>
