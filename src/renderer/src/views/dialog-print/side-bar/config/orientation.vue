<template>
  <VeeField v-slot="{ field, errors }" name="orientation">
    <Field :data-invalid="!!errors.length">
      <FieldLabel> 方向 </FieldLabel>

      <Select
        :name="field.name"
        :model-value="field.value"
        @update:model-value="field.onChange"
      >
        <SelectTrigger
          class="w-full bg-transparent!"
          :aria-invalid="!!errors.length"
        >
          <SelectValue placeholder="请选择方向" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem
            v-for="item in Object.keys(orientationMap)"
            :key="item"
            :value="item"
          >
            {{ orientationMap[item] }}
          </SelectItem>
        </SelectContent>
      </Select>

      <FieldError :errors="errors" />
    </Field>
  </VeeField>
</template>

<script setup lang="ts">
import { Field as VeeField } from "vee-validate";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orientationMap } from "@/map";
</script>

<style scoped lang="scss"></style>
