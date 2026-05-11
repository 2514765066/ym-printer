import { PrinterTask } from "@type";
import { usePrinterStore } from "./usePrinterStore";

let timer: number;

export const usePrinterTaskStore = defineStore("printer-task", () => {
  const { selectedPrinter } = storeToRefs(usePrinterStore());

  //当前打印机打印机任务
  const printerTasks = ref<PrinterTask[]>([]);

  //获取打印机任务
  const getPrinterTasks = async () => {
    printerTasks.value = await ipcRenderer.invoke(
      "getPrinterTask",
      selectedPrinter.value,
    );
  };

  //初始化任务
  const startPrinterTasks = () => {
    stopPrinterTasks();

    getPrinterTasks();

    timer = window.setInterval(getPrinterTasks, 3000);
  };

  //清除打印任务
  const stopPrinterTasks = () => {
    clearInterval(timer);
  };

  //删除打印任务
  const removePrinterTask = async (id: number) => {
    await ipcRenderer.invoke("removePrinterTask", selectedPrinter.value, id);

    startPrinterTasks();
  };

  return {
    printerTasks,
    getPrinterTasks,
    startPrinterTasks,
    stopPrinterTasks,
    removePrinterTask,
  };
});
