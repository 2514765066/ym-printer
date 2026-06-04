<template>
  <VeeField v-slot="{ field, errors }" name="cartridge">
    <Field :data-invalid="!!errors.length">
      <FieldLabel> 墨盒颜色 </FieldLabel>

      <ToggleGroup
        class="w-full"
        variant="outline"
        type="single"
        :model-value="field.value"
        @update:model-value="val => val && field.onChange(val)"
        :aria-invalid="!!errors.length"
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

      <FieldError :errors="errors" />
    </Field>
  </VeeField>
</template>

<script setup lang="ts">
import { Field as VeeField } from "vee-validate";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cartridgeMap } from "@/map";
</script>

<style scoped lang="scss"></style>
