import { useViewStore } from "@print/stores/useViewStore";
import { getValue } from "@/utils/value";
import { useConfigStore } from "@print/stores/useConfigStore";

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

    //当前范围是奇数
    if (isOdd(part.length)) {
      result.push(0);
    }
  }

  return result;
};

//解析范围
export const useRange = (rangeStr: string | (() => string)) => {
  const { pageCount } = storeToRefs(useViewStore());
  const { config } = storeToRefs(useConfigStore());

  //模式
  const modeMap = {
    simplex: simplexMode,
    duplex: duplexMode,
    mix: mixMode,
  };

  return () => {
    const parts = getValue(rangeStr)
      .split(/[,，]/)
      .map(item => parseRange(item, pageCount.value));

    const fn = modeMap[config.value.mode];

    return fn(parts);
  };
};
