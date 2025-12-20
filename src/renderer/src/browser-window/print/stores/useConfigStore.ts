import useStoreRef from "@/hooks/useStoreRef";
import { useFileStore } from "@print/stores/useFileStore";
import { PrintConfig, FinishBehavior } from "@type";

export const useConfigStore = defineStore("print-config", () => {
  const { file } = storeToRefs(useFileStore());

  //完成行为
  const finishBehavior = useStoreRef<FinishBehavior>("tip", "finishBehavior");

  //打印机
  const printer = useStoreRef("", "printer");

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

  //打印范围中的内容
  const print = async (range: number[]) => {
    await ipcRenderer.invoke(
      "print",
      {
        md5: file.value.md5,
        ...config,
        range: toRaw(range),
      },
      file.value.name
    );
  };

  //是否是全单
  const isSimplex = (range: number[]) => {
    return range.every((value, index) =>
      (index + 1) % 2 === 0 ? value === 0 : true
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

  return {
    finishBehavior,
    config,
    printEven,
    printOdd,
    isSimplex,
    setConfig,
  };
});
