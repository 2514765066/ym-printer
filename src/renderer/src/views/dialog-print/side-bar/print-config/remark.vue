<template>
  <FormField v-slot="{ componentField }" name="remark">
    <FormItem>
      <FormLabel>备注</FormLabel>

      <FormControl>
        <Input
          class="bg-transparent!"
          placeholder="当前打印任务的备注"
          v-bind="componentField"
        />
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
import { Input } from "@/components/ui/input";
</script>

<style scoped lang="scss"></style>
