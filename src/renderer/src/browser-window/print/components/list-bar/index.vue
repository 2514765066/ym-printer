<template>
  <section class="list-bar pt-4 flex flex-col border-r border-border">
    <ElScrollbar view-class="px-4">
      <ElForm ref="ruleFormRef" :model="config">
        <Remark />

        <FinishBehavior />

        <Printer />

        <Orientation />

        <Count />

        <Mode />

        <Range />
      </ElForm>
    </ElScrollbar>

    <Footer class="mt-auto" />
  </section>
</template>

<script setup lang="ts">
import Footer from "./list-bar-footer/index.vue";
import Remark from "./list-bar-config/remark.vue";
import Mode from "./list-bar-config/mode.vue";
import FinishBehavior from "./list-bar-config/finish-behavior.vue";
import Range from "./list-bar-config/range.vue";
import Orientation from "./list-bar-config/orientation.vue";
import Printer from "./list-bar-config/printer.vue";
import Count from "./list-bar-config/count.vue";
import { ElForm, ElScrollbar } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";
import { ruleFormRef } from "./index";

const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss">
.list-bar {
  grid-area: list-bar;
}
</style>
