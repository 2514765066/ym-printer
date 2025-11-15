import { PrintConfig } from "@type";

const createConfig = (): PrintConfig => {
  return {
    printer: localStorage.getItem("printer") ?? "",
    orientation: "portrait",
    count: 1,
    remarks: "",
    simplexRange: "",
    simplexCount: 1,
    duplexRange: "",
  };
};

export const usePrintStore = defineStore("print", () => {
  //打印配置
  const printConfig = ref<PrintConfig>(createConfig());

  //设置配置
  const set = (data: PrintConfig) => {
    printConfig.value = data;
  };

  //重置
  const reset = () => {
    printConfig.value = createConfig();
  };

  //初始化
  const init = () => {
    //保存打印机配置
    watch(
      () => printConfig.value.printer,
      val => {
        localStorage.setItem("printer", val);
      }
    );
  };

  init();

  return {
    printConfig,
    reset,
    set,
  };
});
