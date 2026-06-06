<template>
  <FormField v-slot="{ componentField }" name="name">
    <FormItem>
      <FormLabel>预设名称</FormLabel>

      <FormControl>
        <Input placeholder="请输入预设名称" v-bind="componentField" />
      </FormControl>

      <FormMessage />
    </FormItem>
  </FormField>

  <FormField v-slot="{ componentField }" name="value">
    <FormItem>
      <FormLabel>打印范围</FormLabel>

      <FormControl>
        <Input placeholder="请输入打印范围" v-bind="componentField" />
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
