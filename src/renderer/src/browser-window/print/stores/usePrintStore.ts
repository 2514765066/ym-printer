import { useConfigStore } from "./useConfigStore";
import { useFileStore } from "./useFileStore";
import MessageBox from "@/components/ui/message-box";
import { printDialog } from "@/components/notification";

export const usePrintStore = defineStore("print-print", () => {
  const fileStore = useFileStore();
  const configStore = useConfigStore();

  //是否是全单
  const isSimplex = (range: number[]) => {
    return range.every((value, index) =>
      (index + 1) % 2 === 0 ? value === 0 : true
    );
  };

  //打印范围中的内容
  const print = async (range: number[]) => {
    const { md5, name } = fileStore.file;

    await ipcRenderer.invoke(
      "print",
      {
        md5,
        ...configStore.config,
        range: toRaw(range),
      },
      name
    );
  };

  //打印偶数页
  const printEven = async (range: number[]) => {
    range = range.filter((_, index) => (index + 1) % 2 == 0);

    await print(range);
  };

  //打印奇数页
  const printOdd = async (range: number[]) => {
    range = range.filter((_, index) => (index + 1) % 2 == 1);

    await print(range);
  };

  //自动打印
  const printAuto = async (range: number[]) => {
    //单页
    if (isSimplex(range)) {
      await printOdd(range);

      printFinish(range);

      return;
    }

    await printEven(range);

    const result = await printDialog();

    if (!result) return;

    await printOdd(range);

    printFinish(range);
  };

  //完成打印
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
    isSimplex,
    print,
    printEven,
    printOdd,
    printFinish,
    printAuto,
  };
});
