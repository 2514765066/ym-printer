import { useFileStore } from "@print/stores/useFileStore";
import { PrintConfig } from "@type";

export const useConfigStore = defineStore("print-config", () => {
  const { file } = storeToRefs(useFileStore());

  const finishBehavior = ref(localStorage.getItem("finishBehavior") || "tip");

  //打印配置
  const config = ref<PrintConfig>({
    remark: "",
    printer: localStorage.getItem("printer") || "",
    orientation: "portrait",
    count: 1,
    mode: "mix",
    range: "",
    cartridge: "black",
    dpi: 300,
  });

  //设置配置
  const setConfig = (value: PrintConfig) => {
    config.value = value;
  };

  //打印范围中的内容
  const print = async (range: number[]) => {
    await ipcRenderer.invoke("print", {
      md5: file.value.md5,
      printer: config.value.printer,
      orientation: config.value.orientation,
      count: config.value.count,
      range: toRaw(range),
      cartridge: config.value.cartridge,
      dpi: config.value.dpi,
    });
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

  //初始化
  const init = () => {
    //保存打印机配置
    watch(
      () => config.value.printer,
      val => {
        localStorage.setItem("printer", val);
      }
    );

    //保留打印完成行为
    watch(finishBehavior, val => {
      localStorage.setItem("finishBehavior", val);
    });
  };

  init();

  return {
    finishBehavior,
    config,
    printEven,
    printOdd,
    isSimplex,
    setConfig,
  };
});
