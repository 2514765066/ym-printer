import { useConfigStore } from "./useConfigStore";
import { useFileStore } from "./useFileStore";
import MessageBox from "@/components/ui/message-box";

export const usePrintStore = defineStore("print-print", () => {
  const fileStore = useFileStore();
  const configStore = useConfigStore();

  const printFinish = async (range: number[]) => {
    ipcRenderer.invoke("finishPrint", {
      file: toRaw(fileStore.file),
      config: toRaw(configStore.config),
      range: toRaw(range),
    });

    if (configStore.finishBehavior == "not") {
      return;
    }

    if (configStore.finishBehavior == "close") {
      ipcRenderer.invoke("close");
      return;
    }

    const res = await MessageBox.confirm({
      label: "打印完成",
      content: "打印完成是否退出",
    });

    if (!res) return;

    ipcRenderer.invoke("close");
  };

  //初始化配置
  ipcRenderer.on("openPrint", (_, { file, config }) => {
    fileStore.setFile(file);

    config && configStore.setConfig(config);
  });

  return {
    printFinish,
  };
});
