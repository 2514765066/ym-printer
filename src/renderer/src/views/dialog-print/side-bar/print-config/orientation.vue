<template>
  <VeeField v-slot="{ field, errors }" name="orientation">
    <Field :data-invalid="!!errors.length">
      <FieldLabel> 方向 </FieldLabel>

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
          v-for="item in Object.keys(orientationMap)"
          :key="item"
          :value="item"
        >
          {{ orientationMap[item] }}
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
import { orientationMap } from "@/map";
</script>

<style scoped lang="scss"></style>
