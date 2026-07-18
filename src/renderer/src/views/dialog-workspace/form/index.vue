<template>
  <FormField v-slot="{ componentField }" name="name">
    <FormItem>
      <FormLabel>工作空间名称</FormLabel>

      <FormControl>
        <Input placeholder="请输入工作空间名称" v-bind="componentField" />
      </FormControl>

      <FormMessage />
    </FormItem>
  </FormField>

  <FormField v-slot="{ componentField }" name="printer">
    <FormItem>
      <FormLabel>工作空间打印机</FormLabel>

      <FormControl>
        <Printer
          class="w-full"
          variant="outline"
          :iconVisible="false"
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Printer from '@/components/printer.vue';
</script>

<style scoped lang="scss"></style>
