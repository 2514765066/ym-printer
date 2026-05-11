<template>
  <VeeField v-slot="{ field, errors }" name="range">
    <Field :data-invalid="!!errors.length">
      <FieldLabel> 打印范围 </FieldLabel>

      <Input
        class="bg-transparent!"
        placeholder="格式 1,1-,-10,-"
        v-bind="field"
        :aria-invalid="!!errors.length"
      />
    </Field>

    <FieldError :errors="errors" />
  </VeeField>
</template>

<script setup lang="ts">
import { Field as VeeField } from "vee-validate";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
</script>

<style scoped lang="scss"></style>
