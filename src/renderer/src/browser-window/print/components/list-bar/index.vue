<template>
  <section class="list-bar pt-4 flex flex-col border-r border-border">
    <ElScrollbar view-class="px-4">
      <ElForm ref="ruleFormRef" :model="config" :rules="rules">
        <Remark v-model="config.remark" />

        <FinishBehavior v-model="finishBehavior" />

        <Printer v-model="config.printer" />

        <Orientation v-model="config.orientation" />

        <Count v-model="config.count" />

        <Range v-model="config.range" />
      </ElForm>
    </ElScrollbar>

    <Footer class="mt-auto" />
  </section>
</template>

<script setup lang="ts">
import Footer from "./list-bar-footer/index.vue";
import Remark from "./list-bar-config/remark.vue";
import FinishBehavior from "./list-bar-config/finish-behavior.vue";
import Range from "./list-bar-config/range.vue";
import Orientation from "./list-bar-config/orientation.vue";
import Printer from "./list-bar-config/printer.vue";
import Count from "./list-bar-config/count.vue";
import { ElForm, ElScrollbar } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";
import { rules, ruleFormRef } from "./index";

const { config, finishBehavior } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss">
.list-bar {
  grid-area: list-bar;
}
</style>
