<template>
  <ElScrollbar view-class="px-3">
    <FieldGroup>
      <Remark />

      <Printer />

      <Count />

      <Mode />

      <Range />

      <Cardridge />

      <Orientation />
    </FieldGroup>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { FieldGroup } from "@/components/ui/field";
import { ElScrollbar } from "element-plus";
import Remark from "./remark.vue";
import Printer from "./printer.vue";
import Count from "./count.vue";
import Mode from "./mode.vue";
import Range from "./range.vue";
import Cardridge from "./cardridge.vue";
import Orientation from "./orientation.vue";
</script>

<style scoped lang="scss"></style>
