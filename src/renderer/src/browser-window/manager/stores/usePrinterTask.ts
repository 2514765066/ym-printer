import { PrinterTask } from "@type";
import useStoreRef from "@/hooks/useStoreRef";

type Status = "init" | "loading" | "finish";

export const usePrinterTask = defineStore("printerTask", () => {
  //所有打印机
  const printers = ref<string[]>([]);

  //选中的打印机
  const selectedPrinter = useStoreRef("", "printer");

  //当前打印机打印机任务
  const printerTasks = ref<PrinterTask[]>([]);

  //状态
  const status = ref<Status>("init");

  //获取打印机任务
  const getPrinterTasks = async () => {
    printerTasks.value = await ipcRenderer.invoke(
      "getPrinterTask",
      selectedPrinter.value
    );

    console.log(printerTasks.value);
  };

  //设置打印机
  const setPrinter = (value: string) => {
    selectedPrinter.value = value;
  };

  //初始化
  const init = async () => {
    printers.value = await ipcRenderer.invoke("getPrinters");

    watchEffect(async () => {
      if (!selectedPrinter.value) {
        return;
      }

      status.value = "loading";

      await getPrinterTasks();

      status.value = "finish";
    });
  };

  init();

  return {
    printers,
    selectedPrinter,
    printerTasks,
    status,
    getPrinterTasks,
    setPrinter,
  };
});
