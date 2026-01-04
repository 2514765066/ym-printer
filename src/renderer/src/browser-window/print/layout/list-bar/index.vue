<template>
  <section class="list-bar pt-4 flex flex-col border-r border-border">
    <ElScrollbar view-class="px-4">
      <ElForm ref="ruleFormRef" :model="config" hide-required-asterisk>
        <ListBarConfig />
      </ElForm>
    </ElScrollbar>

    <Footer class="mt-auto" />
  </section>
</template>

<script setup lang="ts">
import ListBarConfig from "./list-bar-config/inde.vue";
import Footer from "./list-bar-footer/index.vue";
import { ElForm, ElScrollbar } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";
//@ts-ignore
import { ruleFormRef } from "./index";

const { config } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss">
.list-bar {
  grid-area: list-bar;
}
</style>
