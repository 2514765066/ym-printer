//补全范围
export const padRange = (range: string, max: number) => {
  if (!range) {
    return "";
  }

  const parts = range.split(",").map(s => s.trim());

  const result = parts.map(part => {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");

      const start = startStr === "" ? 1 : startStr;

      const end = endStr === "" ? max : endStr;

      return `${start}-${end}`;
    }

    return part;
  });

  return result.join(",");
};

//解析单独的范围
const parseRange = (range: string) => {
  //纯数字
  if (!range.includes("-")) {
    return [Number(range)];
  }

  let [start, end] = range.split("-").map(Number);

  if (start > end) {
    [start, end] = [end, start];
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

//是不是奇数
const isOdd = (num: number) => {
  return num % 2 === 1;
};

//解析范围
export const useRange = () => {
  //范围
  const range = ref<number[]>([]);

  //解析范围
  const parser = (rangeStr: string) => {
    const result: number[] = [];

    const parts = rangeStr.split(/[,，]/).map(parseRange);

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

      //下一位是单数字并且是当前范围是奇数
      if (nextPart && nextPart.length == 1 && isOdd(part.length)) {
        result.push(0);
        continue;
      }
    }

    range.value = result;
  };

  return {
    range,
    parser,
  };
};
