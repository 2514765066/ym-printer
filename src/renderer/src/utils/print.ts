import { printToast } from "@/components/print-toast";
import { Doc } from "@type";
import { parserRange } from "./range";

//是否是全单
const isSimplex = (range: number[]) => {
  return range.every((value, index) =>
    (index + 1) % 2 === 0 ? value === 0 : true,
  );
};

//打印范围中的内容
const print = async (config: Doc, range: number[]) => {
  await ipcRenderer.invoke("print", config, range);
};

//获取偶数范围
const getEvenRange = (range: number[]) => {
  return range.filter((_, index) => (index + 1) % 2 == 0);
};

//获取奇数范围
const getOddRange = (range: number[]) => {
  return range.filter((_, index) => (index + 1) % 2 == 1);
};

//打印偶数页
export const printEven = async (config: Doc) => {
  const range = parserRange(config);

  await print(config, getEvenRange(range));
};

//打印奇数页
export const printOdd = async (config: Doc) => {
  const range = parserRange(config);

  await print(config, getOddRange(range));
};

//自动打印
export const printAuto = async (
  config: Doc,
  printFinish?: () => void,
  printCancel?: () => void,
) => {
  if (!config.formatRange) {
    return;
  }

  //单页
  if (isSimplex(config.formatRange)) {
    await print(config, getOddRange(config.formatRange));

    printFinish && printFinish();
    return;
  }

  //打印偶数页
  await print(config, getEvenRange(config.formatRange));

  const result = await printToast(config);

  if (!result) {
    printCancel && printCancel();

    return;
  }

  //打印奇数页
  await print(config, getOddRange(config.formatRange));

  printFinish && printFinish();

  return;
};
