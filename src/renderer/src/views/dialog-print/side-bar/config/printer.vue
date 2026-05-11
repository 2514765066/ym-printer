<template>
  <VeeField v-slot="{ field, errors }" name="printer">
    <Field :data-invalid="!!errors.length">
      <FieldLabel> 打印机 </FieldLabel>

      <Select
        :name="field.name"
        :model-value="field.value"
        @update:model-value="
          e => {
            selectPrinter(e as string);
            field.onChange(e);
          }
        "
      >
        <SelectTrigger
          class="w-full bg-transparent!"
          :aria-invalid="!!errors.length"
        >
          <SelectValue placeholder="请选择打印机" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem v-for="item in printers" :key="item" :value="item">
            {{ item }}
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
import { usePrinterStore } from "@/stores/usePrinterStore";

const { printers } = storeToRefs(usePrinterStore());
const { selectPrinter } = usePrinterStore();
</script>

<style scoped lang="scss"></style>
