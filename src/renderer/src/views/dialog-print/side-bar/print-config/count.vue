<template>
  <VeeField v-slot="{ field, errors }" name="count">
    <Field :data-invalid="!!errors.length">
      <FieldLabel> 打印份数 </FieldLabel>

      <NumberField
        class="w-full"
        :default-value="1"
        :min="1"
        :max="999"
        :model-value="field.value"
        @update:model-value="field.onChange"
      >
        <NumberFieldContent class="bg-transparent!">
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>

      <FieldError :errors="errors" />
    </Field>
  </VeeField>
</template>

<script setup lang="ts">
import { Field as VeeField } from "vee-validate";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
</script>

<style scoped lang="scss"></style>
