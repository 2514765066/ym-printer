<template>
  <ElDrawer
    v-model="visible"
    size="100%"
    :show-close="false"
    direction="btt"
    :with-header="false"
    class="ym-drawer"
    fullscreen
    :modal="false"
  >
    <main class="print grid">
      <TitleBar />

      <ListBar @close="close" @submit="handleSubmit" />

      <ToolBar />

      <Content />
    </main>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ElDrawer } from "element-plus";
import TitleBar from "./title-bar/index.vue";
import Content from "./content/index.vue";
import ListBar from "./list-bar/index.vue";
import ToolBar from "./tool-bar/index.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { usePrintStore } from "@/stores/usePrintStore";
import { padRange } from "@/utils/print";
import { usePdfStore } from "@/stores/usePdfStore";
import { PrintConfig } from "@type";

const { set, reset } = usePrintStore();
const { printConfig } = storeToRefs(usePrintStore());
const { pageCount } = storeToRefs(usePdfStore());

const visible = ref(false);

//回调
let callback: (data: PrintConfig) => void;

//处理提交
const handleSubmit = () => {
  printConfig.value.simplexRange = padRange(
    printConfig.value.simplexRange,
    pageCount.value
  );

  printConfig.value.duplexRange = padRange(
    printConfig.value.duplexRange,
    pageCount.value
  );

  callback(printConfig.value);

  reset();
};

const close = () => {
  visible.value = false;
};

eventEmitter.on("print:show", (setData, data) => {
  if (data) {
    set(data);
  }

  callback = setData;

  visible.value = true;
});
</script>

<style scoped lang="scss">
.print {
  grid-template-columns: 260px calc(100vw - 260px - 1px);
  grid-template-rows: 44px 44px calc(100vh - 44px - 44px);

  grid-template-areas:
    "title-bar title-bar"
    "list-bar tool-bar"
    "list-bar content";
}
</style>
