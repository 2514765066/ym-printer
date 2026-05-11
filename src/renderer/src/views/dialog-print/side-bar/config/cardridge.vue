<template>
  <VeeField v-slot="{ field, errors }" name="cartridge">
    <Field :data-invalid="!!errors.length">
      <FieldLabel> 墨盒颜色 </FieldLabel>

      <Select
        :name="field.name"
        :model-value="field.value"
        @update:model-value="field.onChange"
      >
        <SelectTrigger
          class="w-full bg-transparent!"
          :aria-invalid="!!errors.length"
        >
          <SelectValue placeholder="请选择墨盒颜色" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem
            v-for="item in Object.keys(cartridgeMap)"
            :key="item"
            :value="item"
          >
            {{ cartridgeMap[item] }}
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
import { cartridgeMap } from "@/map";
</script>

<style scoped lang="scss"></style>
