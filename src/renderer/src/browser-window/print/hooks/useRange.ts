import { PrintConfig } from "@type";
import { useViewStore } from "../stores/useViewStore";

//解析单独的范围
const parseRange = (range: string, max: number) => {
  //纯数字
  if (!range.includes("-")) {
    return [Number(range)];
  }

  let [start, end] = range.split("-").map(Number);

  if (start == 0) {
    start = 1;
  }

  if (end == 0) {
    end = max;
  }

  if (start > end) {
    [start, end] = [end, start];
  }

  const res = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return res;
};

//是不是奇数
const isOdd = (num: number) => {
  return num % 2 === 1;
};

//全单模式
const simplexMode = (parts: number[][]) => {
  const flat = parts.flat();

  return flat.flatMap(n => [n, 0]);
};

//全双模式
const duplexMode = (parts: number[][]) => {
  const flat = parts.flat();

  if (isOdd(flat.length)) {
    flat.push(0);
  }

  return flat;
};

//混合模式
const mixMode = (parts: number[][]) => {
  const result: number[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    result.push(...part);

    //单数字
    if (part.length == 1) {
      result.push(0);
      continue;
    }

    const nextPart = parts[i + 1];

    //是最后一个元素并且总范围是奇数
    if (!nextPart && isOdd(result.length)) {
      result.push(0);
      continue;
    }

    //不是最后一个元素并且是当前范围是奇数
    if (nextPart && isOdd(part.length)) {
      result.push(0);
      continue;
    }
  }

  return result;
};

//解析范围
export const useRange = () => {
  const { pageCount } = storeToRefs(useViewStore());

  //范围
  const range = ref<number[]>([]);

  //模式
  const modeMap = {
    simplex: simplexMode,
    duplex: duplexMode,
    mix: mixMode,
  };

  //解析范围
  const parser = (rangeStr: string, mode: PrintConfig["mode"]) => {
    const parts = rangeStr
      .split(/[,，]/)
      .map(item => parseRange(item, pageCount.value));

    const fn = modeMap[mode];

    range.value = fn(parts);
  };

  return {
    range,
    parser,
  };
};
