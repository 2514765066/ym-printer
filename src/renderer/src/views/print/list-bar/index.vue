<template>
  <section class="list-bar pt-4 flex flex-col">
    <ElScrollbar view-class="px-4">
      <ElForm ref="ruleFormRef" :model="printConfig" :rules="rules">
        <Printer v-model="printConfig.printer" />

        <Orientation v-model="printConfig.orientation" />

        <Remarks v-model="printConfig.remarks" />

        <Count v-model="printConfig.count" />

        <SimplexRange v-model="printConfig.simplexRange" />

        <SimplexCount v-model="printConfig.simplexCount" />

        <DuplexRange v-model="printConfig.duplexRange" />
      </ElForm>
    </ElScrollbar>

    <footer class="p-4 flex mt-auto">
      <ElButton
        type="primary"
        style="flex: 1"
        @click="submit"
        :disabled="disable"
      >
        添加
      </ElButton>

      <ElButton text bg style="flex: 1" @click="emits('close')">取消</ElButton>
    </footer>
  </section>
</template>

<script setup lang="ts">
import SimplexCount from "./SimplexCount.vue";
import Printer from "./printer.vue";
import Orientation from "./orientation.vue";
import Count from "./count.vue";
import SimplexRange from "./simplexRange.vue";
import DuplexRange from "./duplexRange.vue";
import { ElButton, ElForm, ElScrollbar } from "element-plus";
import { usePrintStore } from "@/stores/usePrintStore";
import { rules } from "./index";
import eventEmitter from "@/hooks/eventEmitter";
import Remarks from "./remarks.vue";

const emits = defineEmits<{
  close: [];
  submit: [];
}>();

const { printConfig } = storeToRefs(usePrintStore());

const ruleFormRef = useTemplateRef("ruleFormRef");

const disable = computed(
  () => !(printConfig.value.duplexRange || printConfig.value.simplexRange)
);

const submit = async () => {
  if (!ruleFormRef.value) {
    return;
  }

  await ruleFormRef.value.validate(valid => {
    if (!valid) {
      return;
    }

    emits("submit");

    emits("close");

    eventEmitter.emit("success:show", "已添加到队列");
  });
};
</script>

<style scoped lang="scss">
.list-bar {
  grid-area: list-bar;
  border-right: 1px solid var(--border-color);
}
</style>
