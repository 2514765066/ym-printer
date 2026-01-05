import { useStorage } from "@vueuse/core";

import { PrintConfig, FinishBehavior } from "@type";

export const useConfigStore = defineStore("print-config", () => {
  //完成行为
  const finishBehavior = useStorage<FinishBehavior>("finishBehavior", "tip");

  //打印机
  const printer = useStorage("printer", "");

  //打印配置
  const config = reactive<PrintConfig>({
    remark: "",
    get printer() {
      return printer.value;
    },
    set printer(val: string) {
      printer.value = val;
    },
    orientation: "portrait",
    count: 1,
    mode: "mix",
    range: "",
    cartridge: "black",
    dpi: 300,
  });

  //设置配置
  const setConfig = (value: PrintConfig) => {
    Object.assign(config, value);
  };

  return {
    finishBehavior,
    config,
    setConfig,
  };
});
