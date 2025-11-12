<template>
  <section class="list-bar flex flex-col">
    <header class="mb-6 px-4 pt-4">
      <span class="text-main">打印配置</span>
    </header>

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
        打印
      </ElButton>

      <ElButton style="flex: 1" @click="close">取消</ElButton>
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
import { useFileStore } from "@/stores/useFileStore";
import { rules } from "./index";
import { useQueueStore } from "@/stores/useQueueStore";
import { usePdfStore } from "@/stores/usePdfStore";
import eventEmitter from "@/hooks/eventEmitter";
import Remarks from "./remarks.vue";

const { printConfig } = storeToRefs(usePrintStore());
const { reset } = usePrintStore();
const { addQueue } = useQueueStore();
const { selectedFile } = storeToRefs(useFileStore());
const { pageCount } = storeToRefs(usePdfStore());
const router = useRouter();

const ruleFormRef = useTemplateRef("ruleFormRef");

const disable = computed(
  () => !(printConfig.value.duplexRange || printConfig.value.simplexRange)
);

const close = () => {
  router.push("/index");
};

const submit = async () => {
  if (!ruleFormRef.value) {
    return;
  }

  await ruleFormRef.value.validate(valid => {
    if (!valid) {
      return;
    }

    addQueue({
      info: selectedFile.value!,
      pageCount: pageCount.value,
      config: printConfig.value,
    });

    close();

    reset();

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
