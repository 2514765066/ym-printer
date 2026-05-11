import { useStorage } from "@vueuse/core";

export const usePrinterStore = defineStore("printer", () => {
  //所有打印机
  const printers = ref<string[]>([]);

  //选中的打印机
  const selectedPrinter = useStorage("printer", "");

  //设置打印机
  const selectPrinter = (value: string) => {
    selectedPrinter.value = value;
  };

  //初始化
  const init = async () => {
    printers.value = await ipcRenderer.invoke("getPrinters");
  };

  init();

  return {
    printers,
    selectedPrinter,
    selectPrinter,
  };
});
