<template>
  <VeeField v-slot="{ field }" name="remark">
    <Field>
      <FieldLabel> 备注 </FieldLabel>

      <Input
        class="bg-transparent!"
        placeholder="当前打印任务的备注"
        v-bind="field"
      />
    </Field>
  </VeeField>
</template>

<script setup lang="ts">
import { Field as VeeField } from "vee-validate";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
</script>

<style scoped lang="scss"></style>
