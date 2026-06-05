<template>
  <FormField v-slot="{ componentField }" name="range">
    <FormItem>
      <FormLabel>打印范围</FormLabel>

      <FormControl>
        <Input
          class="bg-transparent!"
          placeholder="格式 1,1-,-10,-"
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
