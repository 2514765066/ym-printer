<template>
  <div class="print-window wh-screen grid">
    <TitleBar />

    <ListBar />

    <ToolBar />

    <Content />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import TitleBar from "@print/components/title-bar/index.vue";
import ListBar from "@print/components/list-bar/index.vue";
import ToolBar from "@print/components/tool-bar/index.vue";
import Content from "@print/components/content/index.vue";
import { useConfigStore } from "@print/stores/useConfigStore";
import { useFileStore } from "@print/stores/useFileStore";
import { printFinishKey } from "./keys";
import confirm from "@/service/confirm";

const fileStore = useFileStore();
const configStore = useConfigStore();

//初始化配置
ipcRenderer.on("openPrint", (_, { file, config }) => {
  fileStore.setFile(file);

  config && configStore.setConfig(config);
});

//完成打印
provide(printFinishKey, async (range: number[]) => {
  ipcRenderer.invoke("finishPrint", {
    file: toRaw(fileStore.file),
    config: toRaw(configStore.config),
    range: toRaw(range),
  });

  switch (configStore.finishBehavior) {
    case "close":
      ipcRenderer.invoke("close");
      break;

    case "not":
      break;

    default:
      const res = await confirm({
        type: "info",
        title: "打印完成",
        content: "打印完成是否退出",
      });

      if (!res) {
        return;
      }

      ipcRenderer.invoke("close");
  }
});
</script>

<style lang="scss">
.print-window {
  background-color: var(--bg-color);

  grid-template-rows: 44px 50px calc(100vh - 44px - 50px);
  grid-template-columns: 260px calc(100vw - 260px);

  grid-template-areas:
    "title-bar title-bar"
    "list-bar tool-bar"
    "list-bar content";
}
</style>
