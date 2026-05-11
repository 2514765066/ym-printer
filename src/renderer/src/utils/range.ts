import { DocFinish } from "@type";

//解析单独的范围
const formatRange = (range: string, max: number) => {
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

//模式地图
const modeMap = {
  //全单模式
  simplex: (parts: number[][]) => {
    const flat = parts.flat();

    return flat.flatMap(n => [n, 0]);
  },

  //全双模式
  duplex: (parts: number[][]) => {
    const flat = parts.flat();

    if (isOdd(flat.length)) {
      flat.push(0);
    }

    return flat;
  },

  //混合模式
  mix: (parts: number[][]) => {
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
  },
};

//解析范围
export const parserRange = (config: DocFinish) => {
  const range = config.range || "-";

  const parts = range
    .split(/[,，]/)
    .map(item => formatRange(item, config.pageCount));

  const fn = modeMap[config.mode];

  return fn(parts);
};
